import axios from "axios";
import { navigate } from "./utils/navigationHelper";

let baseUrl = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      request.headers["authorization"] = `${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axios.post(
            `${baseUrl}/users/refresh-token`,
            null,
            {
              headers: {
                refreshToken: refreshToken,
              },
            }
          );

          if (response.status === 200) {
            const newAccessToken = response.data.accessToken;
            localStorage.setItem("access_token", newAccessToken);
            api.defaults.headers.common["authorization"] = `${newAccessToken}`;
            originalRequest.headers["authorization"] = `${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/userlogin"); 
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/userlogin"); 
      }
    }

    return Promise.reject(error);
  }
);

export default api;
