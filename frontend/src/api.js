import axios from "axios";

const API = axios.create({
  baseURL: "https://fitmode-backend.onrender.com"
});

export default API;