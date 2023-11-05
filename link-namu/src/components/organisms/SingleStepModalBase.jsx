import { useCloseModal } from "../../hooks/useCloseModal";
import ModalButtonBox from "../atoms/ModalButtonBox";
import ModalNextButton from "../atoms/ModalNextButton";
import ModalPrevButton from "../atoms/ModalPrevButton";
import ModalBase from "../molecules/ModalBase";

const SingleStepModalBase = ({
  size,
  buttonName = "확인",
  clickHandler = null,
  children,
}) => {
  const closeModal = useCloseModal();

  const buttonBox = (
    <ModalButtonBox>
      <ModalPrevButton clickHandler={closeModal}>취소</ModalPrevButton>
      <ModalNextButton clickHandler={clickHandler}>
        {buttonName}
      </ModalNextButton>
    </ModalButtonBox>
  );
  return (
    <ModalBase size={size}>
      {children}
      {buttonBox}
    </ModalBase>
  );
};

export default SingleStepModalBase;
