import { useSelector } from "react-redux";
import { selectModal } from "../../store/slices/modalSlice";

import Container from "./Container";
import Overlay from "./Overlay";
import KakaoModal from "../organisms/KakaoModal";
import BookmarkAddModal from "../organisms/BookmarkAddModal";
import CategoryAddModal from "../organisms/CategoryAddModal";
import NotionModal from "../organisms/NotionModal";
import MODAL_TYPES from "../../constants/modal_types";
import { useCloseModal } from "../../hooks/useCloseModal";
import ShareLinkModal from "../organisms/ShareLinkModal";
import WorkspaceAddModal from "../organisms/WorkspaceAddModal";
import WorkspaceDeleteModal from "../organisms/WorkspaceDeleteModal";
import CategoryDeleteModal from "../organisms/CategoryDeleteModal";
import SaveShareLinkModal from "../organisms/SaveShareLinkModal";
import CategoryRenameModal from "../organisms/CategoryRenameModal";
import WorkspaceRenameModal from "../organisms/WorkspaceRenameModal";
import GoogleDocsModal from "../organisms/GoogleDocsModal";
import BookmarkDeleteModal from "../organisms/BookmarkDeleteModal";
import BookmarkEditModal from "../organisms/BookmarkEditModal";
import BookmarkImageUpdateModal from "../organisms/BookmarkImageUpdateModal";

const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.KakaoModal,
    component: <KakaoModal />,
  },
  {
    type: MODAL_TYPES.NotionModal,
    component: <NotionModal />,
  },
  {
    type: MODAL_TYPES.GoogleModal,
    component: null,
  },
  {
    type: MODAL_TYPES.BookmarkAddModal,
    component: <BookmarkAddModal />,
  },
  {
    type: MODAL_TYPES.CategoryAddModal,
    component: <CategoryAddModal />,
  },
  {
    type: MODAL_TYPES.WorkspaceAddModal,
    component: <WorkspaceAddModal />,
  },
  {
    type: MODAL_TYPES.ShareLinkModal,
    component: <ShareLinkModal />,
  },
  {
    type: MODAL_TYPES.SaveShareLinkModal,
    component: <SaveShareLinkModal />,
  },
  {
    type: MODAL_TYPES.WorkspaceDeleteModal,
    component: <WorkspaceDeleteModal />,
  },
  {
    type: MODAL_TYPES.CategoryDeleteModal,
    component: <CategoryDeleteModal />,
  },
  {
    type: MODAL_TYPES.GoogleDocsModal,
    component: <GoogleDocsModal />,
  },
  {
    type: MODAL_TYPES.SaveShareLinkModal,
    component: <SaveShareLinkModal />,
  },
  {
    type: MODAL_TYPES.CategoryRenameModal,
    component: <CategoryRenameModal />,
  },
  {
    type: MODAL_TYPES.WorkspaceRenameModal,
    component: <WorkspaceRenameModal />,
  },
  {
    type: MODAL_TYPES.BookmarkDeleteModal,
    component: <BookmarkDeleteModal />,
  },
  {
    type: MODAL_TYPES.BookmarkEditModal,
    component: <BookmarkEditModal />,
  },
  {
    type: MODAL_TYPES.BookmarkImageEditModal,
    component: <BookmarkImageUpdateModal />,
  },
];

function GlobalModal() {
  const { modalType, isOpen } = useSelector(selectModal);
  const closeModal = useCloseModal();
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });
  const renderModal = () => {
    return findModal.component;
  };

  return (
    <Container>
      <Overlay onClick={closeModal} />
      {renderModal()}
    </Container>
  );
}

export default GlobalModal;
