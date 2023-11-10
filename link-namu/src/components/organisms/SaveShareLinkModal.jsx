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
import { useWorkspaceList } from "../../hooks/useWorkspaceList";
import { printToast } from "../../utils/toast";

const SaveShareLinkModal = () => {
  const closeModal = useCloseModal();
  const [shareLink, setShareLink] = useState(null);
  const [isCategoryShareLink, setIsCategoryShareLink] = useState(null);
  const [workspaceId, setWorkspaceId] = useState(null);
  const { refetchData } = useWorkspaceList();

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
    const queryString = url?.split("?")[1];
    if (queryString.startsWith(LINK_TYPE.WORKSPACE)) {
      return {
        type: LINK_TYPE.WORKSPACE,
        encodedId: queryString.replace(`${LINK_TYPE.WORKSPACE}=`, ""),
      };
    }
    if (queryString.startsWith(LINK_TYPE.CATEGORY)) {
      return {
        type: LINK_TYPE.CATEGORY,
        encodedId: queryString.replace(`${LINK_TYPE.CATEGORY}=`, ""),
      };
    }
    return {
      type: null,
      encodedId: null,
    };
  };

  const saveShareLink = () => {
    if (!shareLink) {
      printToast("공유 링크를 입력해주세요.");
      return;
    }
    const data = extractCode(shareLink);
    console.log("추출 코드", data);
    if (!data.type || !data.encodedId) {
      printToast("링크 분석 중 오류가 발생하였습니다.");
      return;
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
      })
        .then((res) => {
          console.log(res);

          if (res?.status !== 200) {
            throw new Error(res.data?.error?.message);
          }

          alert("추가되었습니다.");
          refetchData();
          closeModal();
        })
        .catch((err) => {
          const msg = err.message;
          console.log(msg);
          printToast(msg, "error");
        });
    } else if (data.type === LINK_TYPE.WORKSPACE) {
      addWorkspaceFromEncodedId({ encodedWorkspaceId: data.encodedId })
        .then((res) => {
          console.log(res);

          if (res?.statue !== 200) {
            throw new Error(res.data?.error?.message);
          }

          alert("추가되었습니다.");
          refetchData();
          closeModal();
        })
        .catch((err) => {
          const msg = err.message;
          console.log(msg);
          printToast(msg, "error");
        });
    } else {
      throw new Error("링크 분석 중 오류가 발생하였습니다.");
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
