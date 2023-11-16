import WorkspaceSeleceBox from "../atoms/WorkspaceSelectBox";
import { useEffect, useState } from "react";
import { createCategory } from "../../apis/category";
import ModalTitle from "../atoms/ModalTitle";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalBox from "../atoms/ModalBox";
import ModalTextInput from "../atoms/ModalTextInput";
import { useCloseModal } from "../../hooks/useCloseModal";
import SingleStepModalBase from "./SingleStepModalBase";
import { useModalData } from "../../hooks/useModalData";
import { printToast } from "../../utils/toast";
import { useWorkspaceList } from "../../hooks/useWorkspaceList";

const CategoryAddModal = ({ data }) => {
  const closeModal = useCloseModal();
  const modalData = useModalData();
  const [workspaceId, setWorkspaceId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const { refetchData } = useWorkspaceList();

  useEffect(() => {
    console.log("modalData", modalData);
  }, [modalData]);
  const addCategory = () => {
    if (!categoryName) {
      printToast("카테고리 이름을 입력해주세요.", "error");
      return;
    }

    createCategory({
      workspaceId: modalData?.workspaceId,
      categoryName: categoryName,
    })
      .then((res) => {
        if (res.status === 200) {
          const msg = "카테고리가 추가되었습니다.";
          console.log(msg);
          printToast(msg, "success");
          refetchData();
          closeModal();
        } else {
          throw new Error(res.data?.error?.message);
        }
      })
      .catch((err) => {
        const msg = `[카테고리 추가 에러] ${err.message}`;
        printToast(msg, "error");
        console.log(msg);
      });
  };

  const content = (
    <>
      <ModalTitle>카테고리 추가</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>생성할 카테고리 이름</ModalSubtitle>
          <ModalTextInput
            value={categoryName}
            changeHandler={setCategoryName}
            placeholder="생성할 카테고리의 이름을 입력해주세요."
          />
        </div>
      </ModalBox>
    </>
  );

  return (
    <>
      <SingleStepModalBase
        size="md"
        buttonName="추가"
        clickHandler={addCategory}
      >
        {content}
      </SingleStepModalBase>
    </>
  );
};

export default CategoryAddModal;
