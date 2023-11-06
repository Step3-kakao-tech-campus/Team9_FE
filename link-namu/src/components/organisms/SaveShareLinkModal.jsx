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
import WorkspaceSeleceBox from "../atoms/WorkspaceSelectBox";

const SaveShareLinkModal = () => {
  const closeModal = useCloseModal();
  const [shareLink, setShareLink] = useState(null);
  const [isCategoryShareLink, setIsCategoryShareLink] = useState(null);
  const [workspaceId, setWorkspaceId] = useState(null);

  const LINK_TYPE = {
    WORKSPACE: "workspace",
    CATEGORY: "category",
  };

  useEffect(() => {
    if (!shareLink) {
      setIsCategoryShareLink(false);
      return;
    }
    console.log(shareLink);
    const type = extractCode(shareLink)?.type;

    if (type === LINK_TYPE.CATEGORY) {
      setIsCategoryShareLink(true);
    } else {
      setIsCategoryShareLink(false);
    }
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
        if (!workspaceId) {
          throw new Error("워크스페이스를 선택해주세요.");
        }
        addCategoryFromEncodedId({
          workspaceId: workspaceId,
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
        {isCategoryShareLink && (
          <div>
            <ModalSubTitle>워크스페이스 선택</ModalSubTitle>
            <WorkspaceSeleceBox
              value={workspaceId}
              changeHandler={setWorkspaceId}
            />
          </div>
        )}
      </ModalBox>
    </SingleStepModalBase>
  );
};

export default SaveShareLinkModal;