import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * 메세지를 화면 중앙 하단에 출력하는 컴포넌트 메세지와 타입으로 구성
 * @param {string} message - 토스트 메세지
 * @param {{error, success}} type - 토스트의 유형
 */
const Toast = ({ message, type }) => {
  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {type === "success" &&
        toast.success(message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })}
      {type === "error" &&
        toast.error(message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })}
    </div>
  );
};

export default Toast;
