import axios from "axios";

const api = axios.create({
  baseURL: "https://satinder-thinkboard-backend-codebase.onrender.com/api/",
});

/*
  API:
  > Development: http://localhost:5000
  > Production: https://satinder-thinkboard-backend-codebase.onrender.com
*/

export default api;
