import { useEffect, useState } from "react";
import { useCloseModal } from "../../hooks/useCloseModal";
import {
  addWorkspaceFromEncodedId,
  addCategoryFromEncodedId,
} from "../../apis/share";

import SingleStepModalBase from "../organisms/SingleStepModalBase";
import ModalBox from "../atoms/ModalBox";
import ModalTitle from "../atoms/ModalTitle";
import ModalSubTitle from "../atoms/ModalSubtitle";
import ModalTextInput from "../atoms/ModalTextInput";

const SaveShareLinkModal = () => {
  const closeModal = useCloseModal();
  const [shareLink, setShareLink] = useState(null);
  const LINK_TYPE = {
    WORKSPACE: "workspace",
    CATEGORY: "category",
  };

  useEffect(() => {
    console.log(shareLink);
  }, [shareLink]);

  const extractCode = (url) => {
    const query = url?.split("?")[1];
    const [type, encodedId] = query?.split("=");

    return {
      type: type,
      encodedId: encodedId + "=",
    };
  };

  const saveShareLink = () => {
    try {
      if (!shareLink) {
        throw new Error("공유 링크를 입력해주세요.");
      }

      const data = extractCode(shareLink);
      if (!data.type || !data.encodedId) {
        throw new Error("링크 분석 중 오류가 발생하였습니다.");
      }
      console.log("type: ", data.type);
      console.log("encodedId: ", data.encodedId);

      if (data.type === LINK_TYPE.CATEGORY) {
        addCategoryFromEncodedId({
          encodedCategoryId: data.encodedId,
        }).then((res) => {
          console.log(res);

          if (res?.status !== 200) {
            throw new Error(res); // 에러 메시지로 수정하기
          }

          alert("추가되었습니다.");
          closeModal();
        });
      } else if (data.type === LINK_TYPE.WORKSPACE) {
        addWorkspaceFromEncodedId({ encodedWorkspaceId: data.encodedId }).then(
          (res) => {
            console.log(res);

            if (res?.statue !== 200) {
              throw new Error(res); // 에러 메시지로 수정하기
            }

            alert("추가되었습니다.");
            closeModal();
          }
        );
      } else {
        throw new Error("링크 분석 중 오류가 발생하였습니다.");
      }
    } catch (err) {
      const msg = "[공유 링크 가져오기] " + err.message;
      console.log(msg);
      alert(msg);
    }
  };

  return (
    <SingleStepModalBase
      size="md"
      buttonName="가져오기"
      clickHandler={saveShareLink}
    >
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
