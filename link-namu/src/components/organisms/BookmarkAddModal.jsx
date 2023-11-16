import { useEffect, useState } from "react";
import { useCloseModal } from "../../hooks/useCloseModal";
import { useModalData } from "../../hooks/useModalData";
import { createBookmark } from "../../apis/bookmark";
import { stringToTags } from "../../utils/stringToTags";

import MultiStepModalBase from "./MultiStepModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalTextInput from "../atoms/ModalTextInput";
import { printToast } from "../../utils/toast";
import Checkbox from "../atoms/Checkbox";
import BookmarkImageSelect from "../molecules/BookmarkImageSelect";

const BookmarkAddModal = () => {
  const closeModal = useCloseModal();
  const modalData = useModalData();
  const [workspaceId, setWorkspaceId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [bookmarkLink, setBookmarkLink] = useState("");
  const [bookmarkName, setBookmarkName] = useState("");
  const [bookmarkDescription, setBookmarkDescription] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [allowImage, setAllowImage] = useState(false);
  const [imageData, setImageData] = useState();

  useEffect(() => {
    if (!modalData) return;
    console.log("modal data", modalData);
    setWorkspaceId(modalData.workspaceId);
    setCategoryId(modalData.categoryId);
  }, [modalData]);

  const page1 = (
    <>
      <ModalTitle>북마크 추가하기</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>북마크 링크</ModalSubtitle>
          <ModalTextInput
            changeHandler={setBookmarkLink}
            value={bookmarkLink}
            placeholder="https://..."
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
        <div>
          <ModalSubtitle>
            이미지 선택
            <span className="inline-block px-3">
              <Checkbox
                checked={allowImage}
                onChange={() => setAllowImage((prev) => !prev)}
              />
            </span>
            (미선택 시 링크의 썸네일이 추가됩니다.)
          </ModalSubtitle>
          {allowImage && <BookmarkImageSelect onChange={setImageData} />}
        </div>
      </ModalBox>
    </>
  );

  const addBookmark = () => {
    const imageUrl = allowImage ? imageData.value : null;
    var testBookmarkLink = bookmarkLink;
    if (testBookmarkLink.substring(0, 4) !== "http") {
      testBookmarkLink = "http://" + testBookmarkLink;
    }

    const bookmarkData = {
      bookmarkName: bookmarkName,
      bookmarkLink: testBookmarkLink,
      bookmarkDescription: bookmarkDescription,
      categoryId: categoryId,
      imageUrl: imageUrl,
      tags: stringToTags(tagInput),
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
      printToast(err.message, "error");
      return;
    }

    createBookmark(bookmarkData)
      .then((res) => {
        console.log("북마크 추가", res);

        if (res.status !== 200) {
          const error = res.data?.error;
          console.error(error.message);
          throw new Error(error.errorCode);
        }

        const msg = "북마크가 추가되었습니다 !";
        console.log(msg);
        printToast(msg, "success");

        modalData.handleRefetch();
        closeModal();
      })
      .catch((err) => {
        console.error("ERROR_CODE: ", err.message);
        switch (err.message) {
          case "24000":
            printToast("카테고리에 이미 존재하는 링크입니다.", "error");
            break;
          case "24030":
            printToast("접근 권한이 없습니다.", "error");
            break;
          case "34040":
            printToast("카테고리가 존재하지 않습니다.", "error");
            break;
          case "04004":
            printToast("이미지 데이터 변환 중 문제가 발생하였습니다.", "error");
            break;
          case "04005":
            printToast("유효하지 않은 이미지입니다.", "error");
            break;
          case "04006":
            printToast("이미지가 손상되거나 읽을 수 없는 형식입니다.", "error");
            break;
          case "04007":
            printToast("이미지 URL이 유효하지 않습니다.", "error");
            break;
          case "04008":
            printToast("이미지가 잘못된 형식입니다.", "error");
            break;
          default:
            printToast("북마크 생성에 실패했습니다.", "error");
        }
      });
  };

  const contentList = [];
  contentList.push({ content: page1 });
  contentList.push({
    content: page2,
    title: "추가",
    buttonHandler: addBookmark,
  });

  return <MultiStepModalBase size="md">{contentList}</MultiStepModalBase>;
};

export default BookmarkAddModal;
