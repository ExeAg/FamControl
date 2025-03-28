import { useEffect, useState, createContext, useContext } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import Cookies from "js-cookie";


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors,] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 201) {
        // Retorna true si el registro fue exitoso
        return true;
      }
      return false;
    } catch (error) {
      console.log(error.response ? error.response.data : error);
      setErrors(
        error.response?.data?.message ||
          error.message ||
          "Error en el registro"
      );
      return false;
    }
  };

  const signin = async (userData) => {
    try {
      const res = await loginRequest(userData);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Error en el inicio de sesión:", error.response?.data || error.message);
      setErrors(Array.isArray(error.response.data.message)
        ? error.response.data.message
        : [error.response.data.message || "Error en el inicio de sesión"]);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);



  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;