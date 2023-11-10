import { useState } from "react";
import { useCloseModal } from "../../hooks/useCloseModal";
import { useModalData } from "../../hooks/useModalData";
import { printToast } from "../../utils/toast";

import SingleStepModalBase from "./SingleStepModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalTextInput from "../atoms/ModalTextInput";

const BookmarkImageUpdataModal = () => {
  return (
    <SingleStepModalBase>
      <ModalTitle>북마크 이미지 변경하기</ModalTitle>
    </SingleStepModalBase>
  );
};

export default BookmarkImageUpdataModal;
