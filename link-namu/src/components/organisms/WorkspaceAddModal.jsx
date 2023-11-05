import WorkspaceSeleceBox from "../atoms/WorkspaceSelectBox";
import { useState } from "react";
import { createWorkspace } from "../../apis/workspace";
import ModalTitle from "../atoms/ModalTitle";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalBox from "../atoms/ModalBox";
import ModalTextInput from "../atoms/ModalTextInput";
import { useCloseModal } from "../../hooks/useCloseModal";
import SingleStepModalBase from "./SingleStepModalBase";

const WorkspaceAddModal = () => {
  const closeModal = useCloseModal();
  const [workspaceName, setWorkspaceName] = useState("");

  const addCategory = () => {
    if (!workspaceName) {
      alert("워크스페이스 이름을 입력해주세요.");
      return;
    }

    createWorkspace({ workspaceName: workspaceName })
      .then((res) => {
        if (res.status === 200) {
          const msg = "워크스페이스가 추가되었습니다.";
          console.log(msg);
          alert(msg); // TODO: toast로 바꾸기
          closeModal();
        } else {
          throw new Error(res.data?.error?.message);
        }
      })
      .catch((err) => {
        const msg = `[워크스페이스 추가 에러] ${err.message}`;
        alert(msg);
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
