import "../molecules/ModalBase";
import { useState } from "react";
import ModalBase from "../molecules/ModalBase";

import upload_cloud from "../../assets/upload_cloud.png";

const KakaoModal = () => {
  const [isSelected, setIsSelected] = useState(false);

  const addedFileArea = (
    <div className="mx-20">
      <span className="text-sm pl-5">File added</span>
      {}
    </div>
  );
  const fileSelectArea = (
    <>
      <div
        className={`flex items-center my-12 mx-24 border rounded-xl ${
          isSelected ? "flex-row px-8 py-4 gap-x-8" : "flex-col p-14 gap-y-6 "
        }`}
      >
        <img
          src={upload_cloud}
          alt="file upload cloud icon"
          className="w-12 h-12"
        />
        <div className={`flex-grow ${!isSelected && "text-center"}`}>
          <span className="block text-sm mb-3">
            Select a file or drag and drop here
          </span>
          <span className="block text-xs text-[#00000066]">
            .txt 또는 .csv 파일
          </span>
        </div>
        <button className="px-4 py-3 border border-[#0f91d2] bg-white rounded-md">
          <span className="text-xs text-[#0F91D2] text-transform: uppercase">
            select file
          </span>
        </button>
      </div>
      {isSelected && addedFileArea}
    </>
  );
  const modalContent = (
    <div>
      <div className="mx-auto text-center">
        <h2 className="text-xl mb-4">카카오톡에서 가져오기</h2>
        <span className="text-sm text-[rgba(0, 0, 0, 0.60)]">
          카카오톡에서 내보내기한 파일을 선택해주세요.
        </span>
      </div>
      {fileSelectArea}
    </div>
  );

  return (
    <ModalBase
      size="lg"
      buttonName="KakaoModal"
      titleName=""
      prevName="취소"
      children={modalContent}
    />
  );
};

export default KakaoModal;
