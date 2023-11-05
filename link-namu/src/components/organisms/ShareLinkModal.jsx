import ModalBase from "../molecules/ModalBase";
import ModalTitle from "../atoms/ModalTitle";
import ModalBox from "../atoms/ModalBox";

const ShareLinkModal = ({ shareLink }) => {
  const copyToClipboard = () => {
    const msg = "클립보드에 복사되었습니다!";
    // alert(msg);
    // alert(msg); // TODO: 토스트로 변경
  };

  return (
    <ModalBase size="md">
      <ModalTitle>공유 링크</ModalTitle>
      <ModalBox>
        <div className="flex flex-row py-2 my-4 border border-[#56678942] rounded-xl">
          <div className="flex flex-grow items-center">
            <input
              defaultValue={shareLink}
              className="block h-6 w-full ml-4 pl-2 focus:caret-transparent"
              readOnly
            />
          </div>
          <div className="px-2">
            <button
              onClick={copyToClipboard}
              className="w-[60px] h-9 rounded-full bg-blue-500 hover:bg-blue-700"
            >
              <span className="text-sm text-white leading-9">복사</span>
            </button>
          </div>
        </div>
      </ModalBox>
    </ModalBase>
  );
};

export default ShareLinkModal;