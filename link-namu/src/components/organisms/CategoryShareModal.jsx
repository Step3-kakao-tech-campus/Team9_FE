import { useState } from "react";
import ModalBox from "../atoms/ModalBox";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalTitle from "../atoms/ModalTitle";
import WorkspaceSeleceBox from "../atoms/WorkspaceSelectBox";
import CategorySelectBox from "../atoms/CategorySelectBox";
import SingleStepModalBase from "./SingleStepModalBase";
// import { shareCategory } from "../../apis/category";
import { useCloseModal } from "../../hooks/useCloseModal";
import { useOpenModal } from "../../hooks/useOpenModal";
import MODAL_TYPES from "../../constants/modal_types";

const CategoryShareModal = () => {
  const closeModal = useCloseModal();
  const openModal = useOpenModal();
  const [workspaceId, setWorkspaceId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [shareLink, setShareLink] = useState(null);

  const content = (
    <>
      <ModalTitle>카테고리 공유 링크 생성</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>워크스페이스 선택</ModalSubtitle>
          <WorkspaceSeleceBox
            value={workspaceId}
            changeHandler={setWorkspaceId}
          />
        </div>
        <div>
          <ModalSubtitle>카테고리 선택</ModalSubtitle>
          <CategorySelectBox
            workspaceId={workspaceId}
            value={categoryId}
            changeHandler={setCategoryId}
          />
        </div>
      </ModalBox>
    </>
  );

  const getCategoryShareLink = () => {
    // shareCategory({ categoryId: categoryId })
    //   .then((res) => {
    //     console.log("카테고리 공유 링크 생성", res);
    //     if (res.status !== 200) {
    //       throw new Error(res.data?.error?.message);
    //     }
    //     setShareLink(res.data?.response?.shareLink);
    //     const msg = `공유 링크 : ${shareLink}`;
    //     alert(msg);
    //     console.log(msg);
    //     closeModal();
    //     openModal({ modalType: MODAL_TYPES.ShareLinkModal });
    //   })
    //   .catch((err) => {
    //     console.log(`[카테고리 공유 링크 생성 에러] ${err.message}`);
    //   });
  };

  return (
    <SingleStepModalBase size="md" clickHandler={getCategoryShareLink}>
      {content}
    </SingleStepModalBase>
  );
};

export default CategoryShareModal;
