import { useEffect, useState } from "react";
import { useModalData } from "../../hooks/useModalData";

import CopyToClipboard from "react-copy-to-clipboard";
import ModalBase from "../molecules/ModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";
import { printToast } from "../../utils/toast";

const ShareLinkModal = () => {
  const modalData = useModalData();
  const [textToCopy, setTextToCopy] = useState(""); // 복사할 텍스트
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!modalData) return;
    setTextToCopy(modalData?.shareLink);
  }, [modalData]);

  const handleCopy = () => {
    setIsCopied(true);

    const msg = "클립보드에 복사되었습니다!";
    printToast(msg, "success");

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <ModalBase size="md">
      <ModalTitle>공유 링크</ModalTitle>
      <ModalBox>
        <div className="flex flex-row py-2 my-4 border border-[#56678942] rounded-xl">
          <div className="flex flex-grow items-center">
            <input
              defaultValue={textToCopy}
              className="block h-6 w-full ml-4 pl-2 focus:caret-transparent"
              readOnly
            />
          </div>
          <div className="px-2">
            <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
              <button className="w-[60px] h-9 rounded-full bg-blue-500 hover:bg-blue-700">
                <span className="text-sm text-white leading-9">복사</span>
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </ModalBox>
    </ModalBase>
  );
};

export default ShareLinkModal;
