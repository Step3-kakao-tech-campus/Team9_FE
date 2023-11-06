import { useEffect, useState } from "react";
import {
  getWorkspaceFromEncodedId,
  getCategoryFromEncodedId,
} from "../../apis/share";

import SingleStepModalBase from "../organisms/SingleStepModalBase";
import ModalBox from "../atoms/ModalBox";
import ModalTitle from "../atoms/ModalTitle";
import ModalSubTitle from "../atoms/ModalSubtitle";
import ModalTextInput from "../atoms/ModalTextInput";

const SaveShareLinkModal = () => {
  const [shareLink, setShareLink] = useState(null);

  useEffect(() => {
    console.log(shareLink);
  }, [shareLink]);

  const extractCode = (url) => {
    const result = {};
    const query = url.split("?")[1];
  };

  const saveShareLink = () => {
    const data = extractCode(shareLink);

    if (data.type === "category") {
      getCategoryFromEncodedId();
    }
  };

  return (
    <SingleStepModalBase size="md" clickHandler={saveShareLink}>
      <ModalTitle>공유 링크로 가져오기</ModalTitle>
      <ModalBox>
        <div>
          <ModalSubTitle>공유 링크</ModalSubTitle>
          <ModalTextInput
            changeHandler={setShareLink}
            value={shareLink}
            placeholder="공유 링크를 입력해주세요."
          />
        </div>
      </ModalBox>
    </SingleStepModalBase>
  );
};

export default SaveShareLinkModal;
