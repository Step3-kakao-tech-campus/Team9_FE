import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";
import closeIcon from "../../assets/x.png";
import ModalCloseButton from "../atoms/ModalCloseButton";

const modalSize = {
  sm: "w-[15rem]",
  md: "w-[30rem]",
  lg: "w-[55rem]",
  xl: "w-[70rem]",
};
const fixedPositionCenter =
  "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]";

/**
 * 기본 모달 창 컴포넌트
 * @param {'sm', 'md', 'lg', 'xl'} size - 모달 창의 크기
 * @param {string} titleName - 모달 창의 제목
 * @param {string} prevName - 모달 창 이전 버튼 이름
 * @param {string} nextName - 모달 창 다음 버튼 이름
 * @param {React.JSX.Element} children - 모달 창 내부 컴포넌트
 */
const ModalBase = ({ size = "md", titleName = "제목", children }) => {
  return (
    <div
      role="dialog"
      aria-modal={true}
      className={`${fixedPositionCenter} ${modalSize[size]} z-50 mx-auto overflow-y-auto bg-white rounded shadow-lg`}
    >
      <ModalBox>{children}</ModalBox>
      <ModalCloseButton />
    </div>
  );
};

export default ModalBase;
