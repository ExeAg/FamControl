import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TOKEN_SECRET } from "../config";
import User from "../models/user.model";
import { createAccessToken } from "../libs/jwt";
import bcrypt from "bcryptjs";


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        console.log("Password recibido:", password);

        if (!password || typeof password !== "string") {
            return res.status(400).json({ error: "Contraseña no válida" });
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
        console.log("Salt rounds:", saltRounds);

        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });

    } catch (error: any) {
        console.error("Error en el registro:", error.message);
        return res.status(500).json({ error: "Error en el servidor" });
    }
};


export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ where: { email } });

    if (!userFound) return res.status(400).json({ message: "The email does not exist" });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json({ message: "The password is incorrect" });

    const token = await createAccessToken({ id: userFound.id, username: userFound.username });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({ id: userFound.id, username: userFound.username, email: userFound.email });
  } catch (error) {
    return res.status(500).json({ message: error instanceof Error ? error.message : "Server error" });
  }
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, TOKEN_SECRET) as JwtPayload;
    const userFound = await User.findByPk(decoded.id);

    if (!userFound) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = userFound;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.cookie("token", "", { httpOnly: true, secure: true, expires: new Date(0) });
  return res.sendStatus(200);
};
