import MODAL_TYPES from "./modal_types";

// 모달 컴포넌트
import KakaoModal from "../components/organisms/KakaoModal";
import BookmarkAddModal from "../components/organisms/BookmarkAddModal";
import CategoryAddModal from "../components/organisms/CategoryAddModal";
import NotionModal from "../components/organisms/NotionModal";
import ShareLinkModal from "../components/organisms/ShareLinkModal";
import WorkspaceAddModal from "../components/organisms/WorkspaceAddModal";
import WorkspaceDeleteModal from "../components/organisms/WorkspaceDeleteModal";
import CategoryDeleteModal from "../components/organisms/CategoryDeleteModal";
import SaveShareLinkModal from "../components/organisms/SaveShareLinkModal";
import CategoryRenameModal from "../components/organisms/CategoryRenameModal";
import WorkspaceRenameModal from "../components/organisms/WorkspaceRenameModal";
import GoogleDocsModal from "../components/organisms/GoogleDocsModal";
import BookmarkDeleteModal from "../components/organisms/BookmarkDeleteModal";
import BookmarkEditModal from "../components/organisms/BookmarkEditModal";
import BookmarkImageUpdateModal from "../components/organisms/BookmarkImageUpdateModal";

const MODALS = {
  // key와 MODAL_TYPES 상수가 같아야 함
  KakaoModal: {
    type: MODAL_TYPES.KakaoModal,
    component: <KakaoModal />,
  },
  NotionModal: {
    type: MODAL_TYPES.NotionModal,
    component: <NotionModal />,
  },
  BookmarkAddModal: {
    type: MODAL_TYPES.BookmarkAddModal,
    component: <BookmarkAddModal />,
  },
  CategoryAddModal: {
    type: MODAL_TYPES.CategoryAddModal,
    component: <CategoryAddModal />,
  },
  WorkspaceAddModal: {
    type: MODAL_TYPES.WorkspaceAddModal,
    component: <WorkspaceAddModal />,
  },
  ShareLinkModal: {
    type: MODAL_TYPES.ShareLinkModal,
    component: <ShareLinkModal />,
  },
  SaveShareLinkModal: {
    type: MODAL_TYPES.SaveShareLinkModal,
    component: <SaveShareLinkModal />,
  },
  WorkspaceDeleteModal: {
    type: MODAL_TYPES.WorkspaceDeleteModal,
    component: <WorkspaceDeleteModal />,
  },
  CategoryDeleteModal: {
    type: MODAL_TYPES.CategoryDeleteModal,
    component: <CategoryDeleteModal />,
  },
  GoogleDocsModal: {
    type: MODAL_TYPES.GoogleDocsModal,
    component: <GoogleDocsModal />,
  },
  CategoryRenameModal: {
    type: MODAL_TYPES.CategoryRenameModal,
    component: <CategoryRenameModal />,
  },
  WorkspaceRenameModal: {
    type: MODAL_TYPES.WorkspaceRenameModal,
    component: <WorkspaceRenameModal />,
  },
  BookmarkDeleteModal: {
    type: MODAL_TYPES.BookmarkDeleteModal,
    component: <BookmarkDeleteModal />,
  },
  BookmarkEditModal: {
    type: MODAL_TYPES.BookmarkEditModal,
    component: <BookmarkEditModal />,
  },
  BookmarkImageUpdateModal: {
    type: MODAL_TYPES.BookmarkImageUpdateModal,
    component: <BookmarkImageUpdateModal />,
  },
};

export default MODALS;
