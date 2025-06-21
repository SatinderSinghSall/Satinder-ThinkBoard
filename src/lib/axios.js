import axios from "axios";

const api = axios.create({
  baseURL: "https://satinder-thinkboard-backend-codebase.onrender.com/api",
});

api.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.token) {
      config.headers.Authorization = `Bearer ${userInfo.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/*
  API:
  > Development: http://localhost:5000
  > Production: https://satinder-thinkboard-backend-codebase.onrender.com
*/

export default api;
