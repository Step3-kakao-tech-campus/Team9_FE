import { useState } from "react";
import { printToast } from "../../utils/toast";
import { updateCategory } from "../../apis/category";
import { useWorkspaceList } from "../../hooks/useWorkspaceList";

import SingleStepModalBase from "./SingleStepModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";
import ModalSubTitle from "../atoms/ModalSubtitle";
import ModalTextInput from "../atoms/ModalTextInput";
import { useModalData } from "../../hooks/useModalData";
import { useCloseModal } from "../../hooks/useCloseModal";

const CategoryRenameModal = () => {
  const closeModal = useCloseModal();
  const modalData = useModalData();
  const [newName, setNewName] = useState(null);
  const { refetchData } = useWorkspaceList();

  const handleRenameCategory = () => {
    if (!newName) {
      printToast("변경할 이름을 입력해주세요.", "error");
      return;
    }

    updateCategory({
      categoryId: modalData?.categoryId,
      categoryName: newName,
    })
      .then((res) => {
        console.log("res", res);
        if (res?.status !== 200) {
          throw new Error(res?.data?.error?.message);
        }

        printToast("변경되었습니다.", "success");
        console.log("[카테고리 수정] 변경되었습니다.");
        refetchData();
        closeModal();
      })
      .catch((err) => {
        const msg = "[카테고리 수정] " + err.message;
        console.log(msg);
        printToast(msg, "error");
      });
  };

  return (
    <SingleStepModalBase
      size="md"
      buttonName="변경"
      clickHandler={handleRenameCategory}
    >
      <ModalTitle>카테고리 이름 바꾸기</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubTitle>변경할 이름</ModalSubTitle>
          <ModalTextInput
            value={newName}
            changeHandler={setNewName}
            placeholder="카테고리의 변경할 이름을 입력해주세요."
          />
        </div>
      </ModalBox>
    </SingleStepModalBase>
  );
};

export default CategoryRenameModal;
