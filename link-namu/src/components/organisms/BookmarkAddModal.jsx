import { useState } from "react";
import ModalBase from "../molecules/ModalBase";

const BookmarkAddModal = () => {
  const [bookmarkData, setBookmarkData] = useState({
    bookmarkName: "",
    bookmarkLink: "",
    bookmarkDescription: "",
    categoryId: null,
    imageUrl: "",
    tags: [],
  });

  return <ModalBase size="md" titleName="북마크 추가하기"></ModalBase>;
};

export default BookmarkAddModal;
