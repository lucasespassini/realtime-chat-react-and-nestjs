import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("payload");
      api.defaults.headers['Authorization'] = null;
      window.location.replace("/auth");
    }
    return Promise.reject(error);
  }
);

export { api };