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
    try {
      const queryParams = new URL(url)?.searchParams;

      const workspaceParam = queryParams.get(LINK_TYPE.WORKSPACE);
      const categoryParam = queryParams.get(LINK_TYPE.CATEGORY);

      if (workspaceParam) {
        return {
          type: LINK_TYPE.WORKSPACE,
          encodedId: decodeURIComponent(workspaceParam),
        };
      }
      if (categoryParam) {
        return {
          type: LINK_TYPE.CATEGORY,
          encodedId: decodeURIComponent(categoryParam),
        };
      }
      return {
        type: null,
        encodedId: null,
      };
    } catch (err) {
      const msg = "잘못된 공유 링크 형식입니다.";
      printToast(msg, "error");
      console.log(msg);
      return;
    }
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
        printToast("워크스페이스를 선택해주세요.", "error");
        return;
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
