import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * 메세지를 화면 중앙 하단에 출력하는 컴포넌트, 버튼과 메세지로 구성
 * @param {string} message - 토스트 메세지
 * @param {string} buttonName - 버튼 텍스트
 * @param {string} buttonStyle - tailwind CSS의 className 형식으로 작성
 * @param {{error, success}} type - 토스트의 유형
 */
const Toast = ({ message, buttonName, buttonStyle, type }) => {
  var notify;

  if (type === "success") {
    notify = () =>
      toast.success(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  } else if (type === "error") {
    notify = () =>
      toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }

  return (
    <div>
      <button className={buttonStyle} onClick={notify}>
        {buttonName}
      </button>
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
    </div>
  );
};

export default Toast;
