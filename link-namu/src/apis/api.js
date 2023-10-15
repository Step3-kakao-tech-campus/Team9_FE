import axios from "axios";
import { getToken } from "../store";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = getToken();
  if (accessToken) {
    config.headers["Authorization"] = "Bearer " + accessToken;
  }
  return config;
});

// middleware
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error", error);
    const status = error?.response.status;

    if (status >= 500) {
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
    return Promise.resolve(error.response);
  }
);
