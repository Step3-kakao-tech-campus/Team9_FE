import SingleStepModalBase from "./SingleStepModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";

const NotionModal = () => {
  const content = (
    <>
      <ModalTitle>노션 연동하기</ModalTitle>
      <ModalBox></ModalBox>
    </>
  );
  return <SingleStepModalBase>{content}</SingleStepModalBase>;
};

export default NotionModal;
