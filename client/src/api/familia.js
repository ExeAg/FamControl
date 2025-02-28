import axios from "./axios"; 

export const createFamiliaRequest = async (data) =>
  axios.post(`/familias`, data, { withCredentials: true });