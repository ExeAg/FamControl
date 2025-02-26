//client/src/api/auth.js
import axios from "./axios";

export const registerRequest = async (user) =>
  axios.post(`/auth/register`, user);

export const loginRequest = async (user) => {
  console.log("Enviando datos de login:", user);
  return axios.post(`/auth/login`, user, { headers: { "Content-Type": "application/json" } });
};

export const verifyTokenRequest = () => axios.get("/verify", { withCredentials: true });
export const logoutRequest = () => axios.post("/logout", { withCredentials: true });