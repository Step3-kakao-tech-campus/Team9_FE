import WorkspaceSeleceBox from "../atoms/WorkspaceSelectBox";
import { useState } from "react";
import { createWorkspace } from "../../apis/workspace";
import ModalTitle from "../atoms/ModalTitle";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalBox from "../atoms/ModalBox";
import ModalTextInput from "../atoms/ModalTextInput";
import { useCloseModal } from "../../hooks/useCloseModal";
import SingleStepModalBase from "./SingleStepModalBase";
import { printToast } from "../../utils/toast";
import { useWorkspaceList } from "../../hooks/useWorkspaceList";

const WorkspaceAddModal = () => {
  const closeModal = useCloseModal();
  const [workspaceName, setWorkspaceName] = useState("");
  const { refetchData } = useWorkspaceList();

  const addCategory = () => {
    if (!workspaceName) {
      printToast("워크스페이스 이름을 입력해주세요.", "error");
      return;
    }

    createWorkspace({ workspaceName: workspaceName })
      .then((res) => {
        if (res.status === 200) {
          const msg = "워크스페이스가 추가되었습니다.";
          console.log(msg);
          printToast(msg, "success");
          refetchData();
          closeModal();
        } else {
          throw new Error(res.data?.error?.message);
        }
      })
      .catch((err) => {
        const msg = `[워크스페이스 추가 에러] ${err.message}`;
        printToast(msg, "error");
        console.log(msg);
      });
  };

  const content = (
    <>
      <ModalTitle>워크스페이스 추가</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>생성할 워크스페이스 이름</ModalSubtitle>
          <ModalTextInput
            value={workspaceName}
            changeHandler={setWorkspaceName}
            placeholder="생성할 워크스페이스의 이름을 입력해주세요."
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

export default WorkspaceAddModal;
