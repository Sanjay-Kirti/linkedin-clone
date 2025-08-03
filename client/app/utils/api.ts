import axios from "axios";

const api = axios.create({
  baseURL: "https://linkedin-clone-backend-imc4.onrender.com",
});

export default api;
