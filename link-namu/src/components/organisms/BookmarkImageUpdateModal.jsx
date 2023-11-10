import { useState } from "react";
import { useCloseModal } from "../../hooks/useCloseModal";
import { useModalData } from "../../hooks/useModalData";
import { printToast } from "../../utils/toast";
import { updateBookmarkImage } from "../../apis/bookmark";

import SingleStepModalBase from "./SingleStepModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";
import ModalSubtitle from "../atoms/ModalSubtitle";
import BookmarkImageSelect from "../molecules/BookmarkImageSelect";

const BookmarkImageUpdateModal = () => {
  const modalData = useModalData();
  const closeModal = useCloseModal();
  const [imageData, setImageData] = useState();

  const updateImage = () => {
    const bookmarkId = modalData.bookmarkId;
    const imageUrl = imageData.value;

    console.log("image url", imageUrl);

    if (!imageUrl) {
      printToast("이미지를 선택해주세요.", "error");
      return;
    }
    if (!bookmarkId) {
      printToast("문제가 발생했습니다.", "error");
      closeModal();
    }
    updateBookmarkImage({ bookmarkId, imageUrl })
      .then((res) => {
        console.log(res);

        if (res.status !== 200) {
          throw new Error(res.data?.error?.message);
        }

        const msg = "변경되었습니다.";
        console.log(msg);
        printToast(msg, "success");
        // TODO: 데이터 refetch
        closeModal();
      })
      .catch((err) => {
        printToast(err.message, "error");
        console.log(err);
      });
  };

  return (
    <SingleStepModalBase size="md" clickHandler={updateImage}>
      <ModalTitle>북마크 이미지 변경하기</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>이미지 선택</ModalSubtitle>
          <BookmarkImageSelect onChange={setImageData} />
        </div>
      </ModalBox>
    </SingleStepModalBase>
  );
};

export default BookmarkImageUpdateModal;
