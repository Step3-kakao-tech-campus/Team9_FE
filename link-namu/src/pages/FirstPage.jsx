import { useState } from "react";
import FirstPageModal from "../components/organisms/FirstPageModal";

import logoNotion from "../assets/notion_logo.png";
import logoGoogle from "../assets/google_logo.png";
import logoKakao from "../assets/kakaotalk_logo.png";
import addBookmark from "../assets/add_bookmark_with_link.png";

const FirstPage = () => {
  const [index, setIndex] = useState(0);
  const PAGE_LENGTH = 9;

  const handleToggleVisibility = () => {
    if (index < PAGE_LENGTH) setIndex(index + 1);
  };

  const startHandler = () => {
    setIndex(0);
  };

  return (
    <div className="min-h-screen bg-gray-100 " onClick={handleToggleVisibility}>
      <FirstPageModal index={index} count={0}>
        안녕하세요. 링크나무입니다.
      </FirstPageModal>
      <FirstPageModal index={index} count={1}>
        링크나무는 사용자에게
        <br />
        북마크 관리를 도와주는 서비스입니다.
      </FirstPageModal>
      <FirstPageModal index={index} count={2}>
        워크스페이스와 카테고리 추가를 클릭하여
        <br />
        폴더를 만들 수 있습니다.
      </FirstPageModal>
      <FirstPageModal index={index} count={3}>
        북마크 추가를 클릭하여 북마크를 만들 수 있습니다.
      </FirstPageModal>
      <FirstPageModal index={index} count={4}>
        카드를 드래그하여 북마크를 이동할 수 있습니다.
      </FirstPageModal>
      <FirstPageModal index={index} count={5}>
        <img
          className="w-[35px] h-[35px] m-1 inline"
          src={logoNotion}
          alt="노션"
        />
        을 클릭하여
        <br />
        노션 페이지에 있는 링크를 가져올 수 있습니다.
      </FirstPageModal>
      <FirstPageModal index={index} count={6}>
        <img
          className="w-[35px] h-[35px] m-1 inline"
          src={logoGoogle}
          alt="구글"
        />
        을 클릭하여
        <br />
        구글 Docs에 있는 링크를 가져올 수 있습니다.
      </FirstPageModal>
      <FirstPageModal index={index} count={7}>
        <img
          className="w-[35px] h-[35px] m-1 inline"
          src={logoKakao}
          alt="카카오톡"
        />
        을 클릭하여
        <br />
        카카오톡 채팅방에 있는 링크를 가져올 수 있습니다.
      </FirstPageModal>
      <FirstPageModal index={index} count={8}>
        <img
          className="w-[35px] h-[35px] m-1 inline"
          src={addBookmark}
          alt="+"
        />
        을 클릭하여
        <br />
        공유받은 북마크를 추가할 수 있습니다.
      </FirstPageModal>
      <FirstPageModal
        index={index}
        count={9}
        isEnd={true}
        startHandler={startHandler}
      >
        환영합니다!
        <br />
        링크나무를 바로 사용해보세요.
      </FirstPageModal>
    </div>
  );
};

export default FirstPage;
