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
      <div
        className={`w-[60px] h-screen border-l bg-white fixed right-0 top-0 flex flex-col justify-end`}
      >
        <SidebarTile
          src={logoNotion}
          title="노션 페이지 연동하기"
          alt="노션 페이지 연동하기"
          onClick={() => openModal({ modalType: MODAL_TYPES.NotionModal })}
        />
        <SidebarTile
          src={logoGoogle}
          title="구글 문서 연동하기"
          alt="구글 문서 연동하기"
          onClick={() => openModal({ modalType: MODAL_TYPES.GoogleDocsModal })}
        />
        <SidebarTile
          src={logoKakao}
          title="카카오톡 나에게 보내기 파일 연동하기"
          alt="카카오톡 나에게 보내기 파일 연동하기"
          onClick={() => openModal({ modalType: MODAL_TYPES.KakaoModal })}
        />
        <SidebarTile
          src={addBookmark}
          title="공유 링크로 가져오기"
          alt="공유 링크로 가져오기"
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
