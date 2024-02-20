import axios from "axios";
import { GenerateError } from "../toast/Toast";

const axiosInterceptorInstanceAdmin = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_URL,
});

axiosInterceptorInstanceAdmin.interceptors.request.use((req) => {
  if (localStorage.getItem("adminToken")) {
    req.headers.Authorization =
      "Bearer " + localStorage.getItem("adminToken");
  }
  return req;
});

axiosInterceptorInstanceAdmin.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      localStorage.removeItem("adminToken");
      GenerateError(error.response.data.message);
      window.location.href = "/admin";
    } else if (error.response && error.response.status === 404) {
      window.location.href = "/admin/error";
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstanceAdmin;
