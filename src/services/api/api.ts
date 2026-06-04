import axios from "axios";

const api = axios.create({
  baseURL: "https://openlibrary.org",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.warn(`API Error ${error.response.status}:`, error.response.data);
    } else if (error.request) {
      console.warn("API Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export { api };
export default api;
