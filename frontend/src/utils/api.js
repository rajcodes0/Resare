import axios from "axios";
const API = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API,
  withCredentials: true, // Important for cookies - backend sends httpOnly cookies
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Correct path with /api prefix
        await api.post("/api/v1/auth/refresh-token");
        return api(originalRequest);
      } catch (refreshError) {
        // Clear localStorage on refresh failure
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
