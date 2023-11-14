import axios from "axios";
import { getAccessToken } from "../utils/auth";
import { printToast } from "../utils/toast";
import { reissue } from "./user";
import { saveTokensToCookie } from "../utils/auth";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

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
  async (error) => {
    console.log("error", error);

    const status = error.response?.status;
    if (status && status === 401) {
      // access token 재발급
      try {
        const originalRequest = error.config;

        const res = await reissue();
        if (res) {
          if (res.status !== 200) {
            throw new Error("토큰 재발급 에러");
          }
          const newAccessToken = res.data?.response?.accessToken.split(" ")[1];
          const newRefreshToken = res.data?.response?.refreshToken;

          originalRequest.headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + newAccessToken,
          };
          saveTokensToCookie({
            refreshToken: newRefreshToken,
            accessToken: newAccessToken,
          });

          return await axios(originalRequest);
        }
      } catch (err) {
        console.log(err.message);
      }
    }

    if (status >= 500) {
      printToast("오류가 발생했습니다. 잠시 후 다시 시도해주세요", "error");
    }
    return Promise.resolve(error.response);
  }
);
