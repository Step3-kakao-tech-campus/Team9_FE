import SingleStepModalBase from "./SingleStepModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";
import ModalSubTitle from "../atoms/ModalSubtitle";
import ModalTextInput from "../atoms/ModalTextInput";

const GoogleDocsModal = () => {
  return (
    <SingleStepModalBase size="md" buttonName="등록하기">
      <ModalTitle>구글 문서 페이지 등록하기</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubTitle>구글 문서 페이지 ID</ModalSubTitle>
          <ModalTextInput />
        </div>
      </ModalBox>
    </SingleStepModalBase>
  );
};

export default GoogleDocsModal;
