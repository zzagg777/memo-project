import axios from "axios";
const IP = "http://54.180.25.65";
const PORT = 3001;

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || `${IP}:${PORT}/api`,
  // baseURL: `${IP}:${PORT}/api`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
