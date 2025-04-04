import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Base URL for backend API
});

export default api;