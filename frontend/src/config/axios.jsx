import axios from "axios";

const clientAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:3001/tienda/api",
});

export default clientAxios;