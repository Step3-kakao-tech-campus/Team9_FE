import { useModalData } from "../../hooks/useModalData";
import { useCloseModal } from "../../hooks/useCloseModal";
import { deleteWorkspace } from "../../apis/workspace";
import { useEffect, useState } from "react";

import SingleStepModalBase from "./SingleStepModalBase";
import ModalBox from "../atoms/ModalBox";
import ModalTitle from "../atoms/ModalTitle";
import { printToast } from "../../utils/toast";

const WorkspaceDeleteModal = () => {
  const closeModal = useCloseModal();
  const modalData = useModalData();
  const [workspaceName, setWorkspaceName] = useState("");

  console.log();
  useEffect(() => {
    console.log(modalData);
  }, [modalData]);

  const handleDeleteWorkspace = () => {
    const workspaceId = modalData?.workspaceId;

    try {
      if (!workspaceId) {
        throw new Error("오류가 발생했습니다.");
      }
    } catch (err) {
      printToast(err.message, "error");
      closeModal();
    }

    deleteWorkspace({ workspaceId: workspaceId })
      .then((res) => {
        console.log("워크스페이스 삭제", res);
        if (res?.status !== 200) {
          throw new Error(res.data?.error?.message);
        }
        printToast("삭제되었습니다.", "success");
        closeModal();
      })
      .catch((err) => {
        const msg = "[워크스페이스 삭제 에러] " + err.message;
        console.log(msg);
        printToast(msg, "error");
        closeModal();
      });
  };

  return (
    <SingleStepModalBase size="md" clickHandler={handleDeleteWorkspace}>
      <ModalTitle>워크스페이스 삭제</ModalTitle>
      <ModalBox>
        <span>{`워크스페이스를 삭제하시겠습니까?`}</span>
      </ModalBox>
    </SingleStepModalBase>
  );
};

export default WorkspaceDeleteModal;
