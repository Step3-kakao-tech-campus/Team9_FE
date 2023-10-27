import SidebarTile from "./SidebarTile";
// images
import logoNotion from "../../assets/notion_logo.png";
import logoShare from "../../assets/share.png";
import logoGoogle from "../../assets/google_logo.png";
import logoKakao from "../../assets/kakaotalk_logo.png";
import addBookmark from "../../assets/add_bookmark_with_link.png";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/slices/modalSlice";
import MODAL_TYPES from "../../constants/modal_types";

/**
 * 우측 고정 위치의 사이드바
 * @returns
 */
const Sidebar = () => {
  const dispatch = useDispatch();

  const handleOpenModal = ({ modalType }) => {
    dispatch(
      openModal({
        modalType: modalType,
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
        <SidebarTile src={logoNotion} alt="notion import" />
        <SidebarTile src={logoGoogle} alt="google import " />
        <SidebarTile
          src={logoKakao}
          alt="kakaotalk import "
          onClick={() => handleOpenModal({ modalType: MODAL_TYPES.KakaoModal })}
        />
        <SidebarTile
          src={addBookmark}
          alt="add bookmark with link"
          padding={false}
          onClick={() =>
            handleOpenModal({ modalType: MODAL_TYPES.BookmarkAddModal })
          }
        />
      </div>
    </>
  );
};

export default Sidebar;
