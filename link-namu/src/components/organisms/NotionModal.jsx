import { useEffect, useState } from "react";
import { notionRegistration } from "../../apis/notion";
import { useCloseModal } from "../../hooks/useCloseModal";
import { useWorkspaceList } from "../../hooks/useWorkspaceList";

import SingleStepModalBase from "./SingleStepModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";
import ModalSubtitle from "../atoms/ModalSubtitle";
import ModalTextInput from "../atoms/ModalTextInput";

import logo_notion from "../../assets/notion_logo.png";
import { printToast } from "../../utils/toast";

const NotionModal = () => {
  const closeModal = useCloseModal();
  const [notionCode, setNotionCode] = useState(null);
  const [notionPageLink, setNotionPageLink] = useState(null);
  const [notionPageId, setNotionPageId] = useState(null);
  const [dataReady, setDataReady] = useState(false);
  const { refetchData } = useWorkspaceList();

  useEffect(() => {
    if (!notionCode || !notionPageId) return;
    setDataReady(true);
  }, [notionCode, notionPageId]);
  useEffect(() => {
    if (!dataReady) return;

    console.log("notion code : ", notionCode);
    console.log("notion page id : ", notionPageId);

    notionRegistration({ notionCode: notionCode, notionPageId: notionPageId })
      .then((res) => {
        console.log("notionRegistration: ", res);

        if (res.status !== 200) {
          throw new Error(res.data?.error?.message);
        }
        const msg = "연동되었습니다.";
        printToast(msg, "success");
        refetchData();
        closeModal();
      })
      .catch((err) => {
        const msg = "[노션 연동 에러] " + err.message;
        console.log(msg);
        printToast(msg, "error");
        // closeModal();
      });
  }, [dataReady]);

  const getNotionPageId = () => {
    if (!notionPageLink) {
      throw new Error("페이지 링크를 입력해주세요.");
    }
    if (!notionPageLink.startsWith("https://www.notion.so")) {
      throw new Error("노션 페이지 링크가 아닙니다.");
    }
    const parts = notionPageLink.split("/");
    const pageIdPart = parts[parts.length - 1]?.split("?")[0];
    const pageId = pageIdPart?.split("-").pop();
    if (!pageId) throw new Error("잘못된 형식의 페이지 링크입니다.");

    setNotionPageId(pageId);
  };

  const registerNotionPage = () => {
    try {
      getNotionPageId();
    } catch (err) {
      const msg = "[노션 페이지 링크 에러] " + err.message;
      console.log(msg);
      printToast(msg, "error");
      return;
    }

    try {
      if (!notionCode) {
        throw new Error("연동을 위해 계정의 권한을 설정해주세요.");
      }
    } catch (err) {
      console.log(err);
      printToast("[노션 계정 연동 에러] " + err.message, "error");
      return;
    }
  };

  function messageHandler(e) {
    if (e.data) {
      console.log("새 창에서 받은 데이터: ", e.data);
      if (e.data["notionCode"]) {
        setNotionCode(e.data["notionCode"]);
        window.removeEventListener("message", messageHandler);
      }
    }
  }

  useEffect(() => {
    if (!notionCode) return;
    console.log("notion code : ", notionCode);
  }, [notionCode]);
  const content = (
    <>
      <ModalTitle>노션 페이지 연동하기</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubtitle>노션 계정 연동</ModalSubtitle>
          <div className="flex flex-row gap-x-2">
            <button
              onClick={() => {
                const redirectUrl = process.env.REACT_APP_NOTION_AUTH_URL;
                window.addEventListener("message", messageHandler);
                const options = "width=500,height=650";
                window.open(redirectUrl, "노션 권한 설정", options);
              }}
              className="p-2 border"
            >
              <span className="mr-2">
                <img
                  src={logo_notion}
                  alt="notion logo"
                  className="inline-block w-5 h-5"
                />
              </span>
              <span>계정 연동 하기</span>
            </button>
            <div>
              {notionCode ? (
                <span>✅</span>
              ) : (
                <span>버튼을 눌러 권한을 설정해주세요.</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <ModalSubtitle>노션 페이지 링크</ModalSubtitle>
          <ModalTextInput
            changeHandler={setNotionPageLink}
            placeholder="노션 페이지의 링크를 입력해주세요."
          />
        </div>
      </ModalBox>
    </>
  );
  return (
    <SingleStepModalBase size="md" clickHandler={registerNotionPage}>
      {content}
    </SingleStepModalBase>
  );
};

export default NotionModal;
