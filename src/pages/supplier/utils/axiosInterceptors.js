import axios from "axios";

let baseUrl = import.meta.env.VITE_BASE_URL;

const supplierApi = axios.create({
  baseURL: baseUrl,
});
supplierApi.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("supplier_token");
    if (token) {
      request.headers["Authorization"] = `${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

supplierApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default supplierApi;
