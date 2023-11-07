import { useOpenModal } from "../../hooks/useOpenModal";

import SidebarTile from "./SidebarTile";

// images
import logoNotion from "../../assets/notion_logo.png";
import logoGoogle from "../../assets/google_logo.png";
import logoKakao from "../../assets/kakaotalk_logo.png";
import addBookmark from "../../assets/add_bookmark_with_link.png";
import MODAL_TYPES from "../../constants/modal_types";

/**
 * 우측 고정 위치의 사이드바
 * @returns
 */
const Sidebar = () => {
  const openModal = useOpenModal();

  return (
    <>
      <div className="w-[60px] h-screen"></div>
      <div
        className={`w-[60px] h-screen border-l bg-white fixed right-0 top-0 flex flex-col justify-end`}
      >
        <SidebarTile
          src={logoNotion}
          alt="notion import"
          onClick={() => openModal({ modalType: MODAL_TYPES.NotionModal })}
        />
        <SidebarTile
          src={logoGoogle}
          alt="google import "
          onClick={() => openModal({ modalType: MODAL_TYPES.GoogleDocsModal })}
        />
        <SidebarTile
          src={logoKakao}
          alt="kakaotalk import "
          onClick={() => openModal({ modalType: MODAL_TYPES.KakaoModal })}
        />
        <SidebarTile
          src={addBookmark}
          alt="share link import"
          padding={false}
          onClick={() =>
            openModal({ modalType: MODAL_TYPES.SaveShareLinkModal })
          }
        />
      </div>
    </>
  );
};

export default Sidebar;
