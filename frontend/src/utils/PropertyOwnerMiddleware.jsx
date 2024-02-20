import axios from "axios";
import { GenerateError } from "../toast/Toast";

const axiosInterceptorInstanceOwner = axios.create({
  baseURL: import.meta.env.VITE_OWNER_URL,
});

axiosInterceptorInstanceOwner.interceptors.request.use((req) => {
  if (localStorage.getItem("propertyToken")) {
    req.headers.Authorization =
      "Bearer " + localStorage.getItem("propertyToken");
  }
  return req;
});

axiosInterceptorInstanceOwner.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 400) {
      localStorage.removeItem("propertyToken");
      window.location.href = "/property";
      GenerateError(error.response.data.message);
    } else if (error.response && error.response.status === 404) {
      window.location.href = "/property/errorpage";
    } else if (error.response && error.response.status === 401) {
      localStorage.removeItem("propertyToken");
      setTimeout(() => {
        GenerateError(error.response.data.message);
      }, 200);
      window.location.href = "/property";
    }
    return Promise.reject(error);
  }
);

export default axiosInterceptorInstanceOwner;
