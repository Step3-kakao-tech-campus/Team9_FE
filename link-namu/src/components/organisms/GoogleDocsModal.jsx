import { useState } from "react";
import { registerGoogleDocs } from "../../apis/googleDocs";
import { printToast } from "../../utils/toast";

import SingleStepModalBase from "./SingleStepModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";
import ModalSubTitle from "../atoms/ModalSubtitle";
import ModalTextInput from "../atoms/ModalTextInput";
import { useCloseModal } from "../../hooks/useCloseModal";
import { useWorkspaceList } from "../../hooks/useWorkspaceList";

const GoogleDocsModal = () => {
  const closeModal = useCloseModal();
  const [pageLink, setPageLink] = useState(null);
  const { refetchData } = useWorkspaceList();

  const extractDocumentId = (url) => {
    if (!url) return "";

    const documentIdPart = url.replace(
      "https://docs.google.com/document/d/",
      ""
    );
    const documentId = documentIdPart.split("/")[0];
    console.log();
    return documentId;
  };

  const handleGoogleDocsRegistration = () => {
    if (!pageLink) {
      printToast("구글 문서 페이지 URL을 입력해주세요.", "error");
      return;
    }

    const documentId = extractDocumentId(pageLink);
    console.log("document id : ", documentId);

    registerGoogleDocs({ documentId: documentId })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error(res?.data?.error?.message);
        }

        const msg = "[구글 DOCS 연동] 페이지가 등록되었습니다.";
        console.log(msg);
        printToast(msg, "success");
        refetchData();
        closeModal();
      })
      .catch((err) => {
        const msg = "[구글 DOCS 연동] " + err.message;
        console.log(msg);
        printToast(msg, "error");
      });
  };

  return (
    <SingleStepModalBase
      size="md"
      buttonName="등록하기"
      clickHandler={handleGoogleDocsRegistration}
    >
      <ModalTitle>구글 문서 페이지 등록하기</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubTitle>구글 문서 페이지 URL</ModalSubTitle>
          <ModalTextInput
            value={pageLink}
            changeHandler={setPageLink}
            placeholder="구글 문서의 페이지 URL을 입력해주세요."
          />
        </div>
      </ModalBox>
    </SingleStepModalBase>
  );
};

export default GoogleDocsModal;
