import SidebarTile from "./SidebarTile";
// images
import logoShare from "../../assets/Share.png";
import logoGoogle from "../../assets/google logo.png";
import logoKakao from "../../assets/kakaotalk logo.png";
import addBookmark from "../../assets/Add bookmark with link.png";

const Sidebar = () => {
  return (
    <div className="w-[60px] h-screen fixed right-0 flex flex-col justify-end border-l border-[#c6c6c6]">
      <SidebarTile src={logoShare} alt="share" />
      <SidebarTile src={logoGoogle} alt="google import " />
      <SidebarTile src={logoKakao} alt="kakaotalk import " />
      <SidebarTile
        src={addBookmark}
        alt="add bookmark with link"
        padding={false}
      />
    </div>
  );
};

export default Sidebar;