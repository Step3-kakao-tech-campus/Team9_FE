import { toast } from "react-toastify";

/**
 * 토스트 메세지를 출력하는 함수
 * @param {string} message
 * @param {{default, success, error, warning, info}} type
 * @returns 토스트 메세지 출력
 */
export const printToast = (message, type = "default") => {
  return toast(<div>{message}</div>, { type: type });
};
