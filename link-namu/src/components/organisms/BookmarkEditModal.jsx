import ModalTitle from "../atoms/ModalTitle";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalBox from "../atoms/ModalBox";
import { useCloseModal } from "../../hooks/useCloseModal";
import SingleStepModalBase from "./SingleStepModalBase";
import { useModalData } from "../../hooks/useModalData";
import { printToast } from "../../utils/toast";
import { useWorkspaceList } from "../../hooks/useWorkspaceList";
import { updateBookmark } from "../../apis/bookmark";
import ModalTextInput from "../atoms/ModalTextInput";
import { useState } from "react";

const BookmarkEditModal = ({ data }) => {
  const closeModal = useCloseModal();
  const modalData = useModalData();
  const { refetchData } = useWorkspaceList();
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkDescription, setBookmarkDescription] = useState("");

  const editBookmarkHandler = () => {
    try {
      if (!bookmarkName) {
        throw new Error("북마크 제목을 입력해주세요.");
      }
    } catch (err) {
      printToast(err.message, "error");
      return;
    }

    updateBookmark({
      bookmarkId: modalData?.bookmarkId,
      bookmarkName: bookmarkName,
      description: bookmarkDescription,
    })
      .then(res => {
        if (res.status === 200) {
          const msg = "북마크가 수정되었습니다.";
          printToast(msg, "success");
          refetchData();
          closeModal();
        } else {
          throw new Error(res.data?.error?.message);
        }
      })
      .catch(err => {
        const msg = `북마크 수정에 실패하였습니다.`;
        printToast(msg, "error");
        console.log(msg);
      });
  };

  const content = (
    <>
      <ModalTitle>북마크 수정</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>수정할 북마크 제목</ModalSubtitle>
          <ModalTextInput
            changeHandler={setBookmarkName}
            value={bookmarkName}
            placeholder="북마크 제목을 입력해주세요."
          />
        </div>
        <div>
          <ModalSubtitle>수정할 북마크 설명</ModalSubtitle>
          <ModalTextInput
            changeHandler={setBookmarkDescription}
            value={bookmarkDescription}
            placeholder="북마크 설명을 입력해주세요."
          />
        </div>
      </ModalBox>
    </>
  );

  return (
    <>
      <SingleStepModalBase
        size="md"
        buttonName="수정"
        clickHandler={editBookmarkHandler}
      >
        {content}
      </SingleStepModalBase>
    </>
  );
};

export default BookmarkEditModal;
