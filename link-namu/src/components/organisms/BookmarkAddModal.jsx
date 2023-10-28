import { useEffect, useState } from "react";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalTextInput from "../atoms/ModalTextInput";
import CategorySelectBox from "../atoms/CategorySelectBox";
import ModalBox from "../atoms/ModalBox";
import MultiStepModalBase from "./MultiStepModalBase";
import WorkspaceSeleceBox from "../atoms/WorkspaceSelectBox";
import { useCloseModal } from "../../hooks/useCloseModal";
import { createBookmark } from "../../apis/bookmark";
import ModalTitle from "../atoms/ModalTitle";

const BookmarkAddModal = () => {
  const closeModal = useCloseModal();
  const [workspaceId, setWorkspaceId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [bookmarkLink, setBookmarkLink] = useState("");
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkDescription, setBookmarkDescription] = useState("");
  const [tagInput, setTagInput] = useState("");

  const page1 = (
    <>
      <ModalTitle>북마크 추가하기</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>북마크 링크</ModalSubtitle>
          <ModalTextInput
            changeHandler={setBookmarkLink}
            value={bookmarkLink}
            placeholder="Link here..."
          />
        </div>
        <div>
          <ModalSubtitle>북마크 제목</ModalSubtitle>
          <ModalTextInput
            changeHandler={setBookmarkName}
            value={bookmarkName}
            placeholder="북마크 제목을 입력해주세요."
          />
        </div>
      </ModalBox>
    </>
  );
  const page2 = (
    <>
      <ModalTitle>북마크 추가하기</ModalTitle>
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
  const page3 = (
    <>
      <ModalTitle>북마크 추가하기</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>북마크 설명 (옵션)</ModalSubtitle>
          <ModalTextInput
            changeHandler={setBookmarkDescription}
            value={bookmarkDescription}
            placeholder="북마크 설명을 입력해주세요."
          />
        </div>
        <div>
          <ModalSubtitle>태그 (옵션)</ModalSubtitle>
          <ModalTextInput
            changeHandler={setTagInput}
            value={tagInput}
            placeholder="태그1 태그2"
          />
        </div>
      </ModalBox>
    </>
  );

  const contentList = [];
  contentList.push(page1);
  contentList.push(page2);
  contentList.push(page3);

  const addBookmark = () => {
    const bookmarkData = {
      bookmarkName: bookmarkName,
      bookmarkLink: bookmarkLink,
      bookmarkDescription: bookmarkDescription,
      categoryId: categoryId,
      imageUrl: "",
      tags: tagInput.split(" "),
    };

    console.log(bookmarkData);

    try {
      if (!bookmarkLink) {
        throw new Error("링크를 입력해주세요.");
      }
      if (!bookmarkName) {
        throw new Error("북마크 제목을 입력해주세요.");
      }
      if (!categoryId) {
        throw new Error("카테고리를 선택해주세요.");
      }
    } catch (err) {
      alert(err.message);
      return;
    }

    createBookmark(bookmarkData)
      .then((res) => {
        console.log("북마크 추가", res);
        if (res.status === 200) {
          const msg = "북마크가 추가되었습니다 !";
          alert(msg); // TODO: toast로 바꾸기
          console.log(msg);
          closeModal();
        } else {
          throw new Error(res.data?.error?.message);
        }
      })
      .catch((err) => {
        const msg = `$[북마크 추가 에러] ${err.message}`;
        alert(msg); // TODO: toast로 바꾸기
        console.log(msg);
      });
  };

  return (
    <MultiStepModalBase size="md" lastButtonHandler={addBookmark}>
      {contentList}
    </MultiStepModalBase>
  );
};

export default BookmarkAddModal;
