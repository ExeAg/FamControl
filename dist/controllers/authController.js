"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.verifyToken = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const user_model_1 = __importDefault(require("../models/user.model"));
const jwt_1 = require("../libs/jwt");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        console.log("Password recibido:", password);
        if (!password || typeof password !== "string") {
            return res.status(400).json({ error: "Contraseña no válida" });
        }
        const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
        console.log("Salt rounds:", saltRounds);
        const salt = yield bcryptjs_1.default.genSalt(saltRounds);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        const newUser = yield user_model_1.default.create({
            username,
            email,
            password: hashedPassword,
        });
        return res.status(201).json({ message: "Usuario registrado con éxito", user: newUser });
    }
    catch (error) {
        console.error("Error en el registro:", error.message);
        return res.status(500).json({ error: "Error en el servidor" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userFound = yield user_model_1.default.findOne({ where: { email } });
        if (!userFound)
            return res.status(400).json({ message: "The email does not exist" });
        const isMatch = yield bcryptjs_1.default.compare(password, userFound.password);
        if (!isMatch)
            return res.status(400).json({ message: "The password is incorrect" });
        const token = yield (0, jwt_1.createAccessToken)({ id: userFound.id, username: userFound.username });
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });
        res.json({ id: userFound.id, username: userFound.username, email: userFound.email });
    }
    catch (error) {
        return res.status(500).json({ message: error instanceof Error ? error.message : "Server error" });
    }
});
exports.login = login;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET);
        const userFound = yield user_model_1.default.findByPk(decoded.id);
        if (!userFound) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        req.user = userFound;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
});
exports.verifyToken = verifyToken;
const logout = (req, res) => {
    res.cookie("token", "", { httpOnly: true, secure: true, expires: new Date(0) });
    return res.sendStatus(200);
};
exports.logout = logout;
//# sourceMappingURL=authController.js.map