import SidebarTile from "./SidebarTile";
// images
import logoShare from "../../assets/share.png";
import logoGoogle from "../../assets/google_logo.png";
import logoKakao from "../../assets/kakaotalk_logo.png";
import addBookmark from "../../assets/add_bookmark_with_link.png";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/slices/modalSlice";

/**
 * 우측 고정 위치의 사이드바
 * @returns
 */
const Sidebar = () => {
  const dispatch = useDispatch();

  const handleOpenKakaoModal = () => {
    dispatch(
      openModal({
        modalType: "KakaoModal",
        isOpen: true,
      })
    );
  };
  const openBookmarkAddModal = () => {
    dispatch(
      openModal({
        modalType: "BookmarkAddModal",
        isOpen: true,
      })
    );
  };

  return (
    <>
      <div className="w-[60px] h-screen"></div>
      <div
        className={`w-[60px] h-screen border-l bg-white fixed right-0 top-0 flex flex-col justify-end`}
      >
        <SidebarTile src={logoShare} alt="share" />
        <SidebarTile src={logoGoogle} alt="google import " />
        <SidebarTile
          src={logoKakao}
          alt="kakaotalk import "
          onClick={handleOpenKakaoModal}
        />
        <SidebarTile
          src={addBookmark}
          alt="add bookmark with link"
          padding={false}
          onClick={openBookmarkAddModal}
        />
      </div>
    </>
  );
};

export default Sidebar;
