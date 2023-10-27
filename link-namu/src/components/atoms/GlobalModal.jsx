import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectModal } from "../../store/slices/modalSlice";

import Container from "./Container";
import Overlay from "./Overlay";
import KakaoFileUploadModal from "../organisms/KakaoFileUploadModal";
import BookmarkAddModal from "../organisms/BookmarkAddModal";

const MODAL_TYPES = {
  KakaoModal: "KakaoModal",
  NotionModal: "NotionModal",
  GoogleModal: "GoogleModal",
  BookmarkAddModal: "BookmarkAddModal",
};
const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.KakaoModal,
    component: <KakaoFileUploadModal />,
  },
  {
    type: MODAL_TYPES.NotionModal,
    component: null,
  },
  {
    type: MODAL_TYPES.GoogleModal,
    component: null,
  },
  {
    type: MODAL_TYPES.BookmarkAddModal,
    component: <BookmarkAddModal />,
  },
];

function GlobalModal() {
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });
  const renderModal = () => {
    return findModal.component;
  };

  return (
    <Container>
      <Overlay onClick={() => dispatch(closeModal())} />
      {renderModal()}
    </Container>
  );
}

export default GlobalModal;
