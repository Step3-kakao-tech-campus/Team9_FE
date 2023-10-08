import SidebarTile from "./SidebarTile";
// images
import logoShare from "../../assets/share.png";
import logoGoogle from "../../assets/google_logo.png";
import logoKakao from "../../assets/kakaotalk_logo.png";
import addBookmark from "../../assets/add_bookmark_with_link.png";

const Sidebar = () => {
  return (
    <>
      <div className="w-[60px] h-screen"></div>
      <div
        className={`w-[60px] h-screen border-l bg-white fixed right-0 top-0 flex flex-col justify-end`}
      >
        <SidebarTile src={logoShare} alt="share" />
        <SidebarTile src={logoGoogle} alt="google import " />
        <SidebarTile src={logoKakao} alt="kakaotalk import " />
        <SidebarTile
          src={addBookmark}
          alt="add bookmark with link"
          padding={false}
        />
      </div>
    </>
  );
};

export default Sidebar;
