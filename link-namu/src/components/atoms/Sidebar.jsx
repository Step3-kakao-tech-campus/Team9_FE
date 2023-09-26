import styles from "./Sidebar.module.css";

// images
import logoShare from "../../assets/Share.png";
import logoGoogle from "../../assets/google logo.png";
import logoKakao from "../../assets/kakaotalk logo.png";
import addBookmark from "../../assets/Add bookmark with link.png";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_tile}>
        <img className={styles.logo} src={logoShare} alt="share" />
      </div>
      <div className={styles.sidebar_tile}>
        <img className={styles.logo} src={logoGoogle} alt="google import" />
      </div>
      <div className={styles.sidebar_tile}>
        <img className={styles.logo} src={logoKakao} alt="kakaotalk import" />
      </div>
      <div className={styles.sidebar_tile}>
        <img
          className={styles.add_bookmark}
          src={addBookmark}
          alt="add bookmark with link"
        />
      </div>
    </div>
  );
};

export default Sidebar;
