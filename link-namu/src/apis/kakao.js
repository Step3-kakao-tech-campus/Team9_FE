import { instance } from "./api";

export const sendMe = ({ file }) => {
  if (!file) return;

  return instance.post(
    "/api/kakao/send-me",
    { file: file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
