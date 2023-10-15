import axios from "axios";
import cookies from "react-cookies";
import Toast from "../components/molecules/Toast";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(config => {
  const accessToken = cookies.load("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }
  return config;
});

// middleware
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log("error", error);
    const status = error?.response.status;

    if (status >= 500) {
      <Toast
        message="오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        type="error"
      />;
    }
    return Promise.resolve(error.response);
  }
);
