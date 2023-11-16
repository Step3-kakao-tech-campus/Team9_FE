import { useModalData } from "../../hooks/useModalData";
import { useCloseModal } from "../../hooks/useCloseModal";
import { useEffect, useState } from "react";
import { deleteCategory } from "../../apis/category";
import { useWorkspaceList } from "../../hooks/useWorkspaceList";

import SingleStepModalBase from "./SingleStepModalBase";
import ModalBox from "../atoms/ModalBox";
import ModalTitle from "../atoms/ModalTitle";
import { printToast } from "../../utils/toast";

const CategoryDeleteModal = () => {
  const closeModal = useCloseModal();
  const modalData = useModalData();
  const { refetchData } = useWorkspaceList();

  console.log();
  useEffect(() => {
    console.log(modalData);
  }, [modalData]);

  const handleDeleteCategory = () => {
    const categoryId = modalData?.categoryId;

    try {
      if (!categoryId) {
        throw new Error("오류가 발생했습니다.");
      }
    } catch (err) {
      printToast(err.message, "error");
      closeModal();
    }

    deleteCategory({ categoryId })
      .then((res) => {
        console.log("카테고리 삭제", res);
        if (res?.status !== 200) {
          throw new Error(res.data?.error?.message);
        }
        printToast("삭제되었습니다.", "success");
        refetchData();
        closeModal();
      })
      .catch((err) => {
        const msg = "[카테고리 삭제 에러] " + err.message;
        console.log(msg);
        printToast(msg, "error");
        closeModal();
      });
  };

  return (
    <SingleStepModalBase size="md" clickHandler={handleDeleteCategory}>
      <ModalTitle>카테고리 삭제</ModalTitle>
      <ModalBox>
        <span>{`카테고리를 삭제하시겠습니까?`}</span>
      </ModalBox>
    </SingleStepModalBase>
  );
};

export default CategoryDeleteModal;
