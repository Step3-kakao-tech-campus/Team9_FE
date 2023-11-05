import WorkspaceSeleceBox from "../atoms/WorkspaceSelectBox";
import { useState } from "react";
import { createCategory } from "../../apis/category";
import ModalTitle from "../atoms/ModalTitle";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalBox from "../atoms/ModalBox";
import ModalTextInput from "../atoms/ModalTextInput";
import { useCloseModal } from "../../hooks/useCloseModal";
import SingleStepModalBase from "./SingleStepModalBase";

const CategoryAddModal = () => {
  const closeModal = useCloseModal();
  const [workspaceId, setWorkspaceId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const addCategory = () => {
    if (!workspaceId) {
      alert("워크스페이스를 선택해주세요.");
      return;
    }
    if (!categoryName) {
      alert("카테고리 이름을 입력해주세요.");
      return;
    }

    createCategory({ workspaceId: workspaceId, categoryName: categoryName })
      .then((res) => {
        if (res.status === 200) {
          const msg = "카테고리가 추가되었습니다.";
          console.log(msg);
          alert(msg); // TODO: toast로 바꾸기
          closeModal();
        } else {
          throw new Error(res.data?.error?.message);
        }
      })
      .catch((err) => {
        const msg = `[카테고리 추가 에러] ${err.message}`;
        alert(msg);
        console.log(msg);
      });
  };

  const content = (
    <>
      <ModalTitle>카테고리 추가</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>상위 워크스페이스 선택</ModalSubtitle>
          <WorkspaceSeleceBox
            changeHandler={(value) => setWorkspaceId(value)}
          />
        </div>
        <div>
          <ModalSubtitle>생성할 카테고리 이름</ModalSubtitle>
          <ModalTextInput
            value={categoryName}
            changeHandler={setCategoryName}
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
