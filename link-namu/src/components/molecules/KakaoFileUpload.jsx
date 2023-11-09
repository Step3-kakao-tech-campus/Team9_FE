import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { sendMe } from "../../apis/kakao";

import ModalBox from "../atoms/ModalBox";

import file_icon from "../../assets/paper_icon.png";
import upload_cloud from "../../assets/upload_cloud.png";
import { printToast } from "../../utils/toast";
import ModalTitle from "../atoms/ModalTitle";
import ModalSubtitle from "../atoms/ModalSubtitle";

const KakaoFileUpload = ({ changeHandler }) => {
  const dispatch = useDispatch();
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInput = useRef(null);

  useEffect(() => {
    console.log("선택된 파일", selectedFile);
  }, [selectedFile]);

  // 파일 선택 핸들러
  const handleUpload = (e) => {
    fileInput.current.click();
  };
  const handleChange = (e) => {
    if (e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // 여기서 선택한 파일을 처리합니다.
      const selectedFile = files[0];
      const fileExtension = selectedFile.name.split(".").pop();
      if (fileExtension === "txt" || fileExtension === "csv") {
        setSelectedFile(selectedFile);
      } else {
        printToast("올바른 파일 형식이 아닙니다.", "error");
      }
    }
  };

  const removeFile = () => {
    fileInput.current.value = "";
    setSelectedFile(null);
  };
  const sendMeHandler = () => {
    console.log("file: ", selectedFile);
    sendMe({ file: selectedFile })
      .then((res) => {
        console.log("send me: ", res.data?.response);
        changeHandler(res.data?.response);
      })
      .catch((err) => console.log(err));
  };
  const selectFileButtonHandler = () => {
    try {
      if (!isFileSelected) throw new Error("파일을 선택해주세요.");
    } catch (err) {
      printToast(err.message, "error");
      throw new Error();
    }
    changeHandler(null);
    sendMeHandler();
  };

  useEffect(() => {
    if (selectedFile) {
      setIsFileSelected(true);
    } else {
      setIsFileSelected(false);
    }
  }, [selectedFile]);

  const addedFileArea = (
    <div className="mx-20">
      <span className="block text-sm pl-5 mb-4">선택한 파일</span>
      {isFileSelected && (
        <div className="flex flex-row gap-x-4 p-4 border rounded-lg">
          <img src={file_icon} alt="file icon" className="w-6 h-6" />
          <span className="flex-grow text-sm">{selectedFile?.name}</span>
          <button
            className="text-xs text-[rgba(0, 0, 0, 0.70)]"
            onClick={removeFile}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );

  const fileSelectArea = (
    <>
      <div
        className={`flex items-center my-12 mx-24 border rounded-xl ${
          isFileSelected
            ? "flex-row px-8 py-4 gap-x-8"
            : "flex-col p-14 gap-y-6 "
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <img
          src={upload_cloud}
          alt="file upload cloud icon"
          className="w-12 h-12"
        />
        <div className={`flex-grow ${!isFileSelected && "text-center"}`}>
          <span className="block text-sm mb-3">
            Select a file or drag and drop here
          </span>
          <span className="block text-xs text-[#00000066]">
            .txt 또는 .csv 파일
          </span>
        </div>
        <button
          className="px-4 py-3 border border-[#0f91d2] bg-white rounded-md"
          onClick={handleUpload}
        >
          <span className="text-xs text-[#0F91D2] text-transform: uppercase">
            select file
          </span>
        </button>
        <input
          type="file"
          accept=".txt, .csv"
          ref={fileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
      {isFileSelected && addedFileArea}
    </>
  );

  return {
    content: (
      <>
        <div className="mx-auto mt-5 text-center">
          <ModalTitle>카카오톡에서 가져오기</ModalTitle>
          <ModalSubtitle>
            카카오톡에서 내보내기한 파일을 선택해주세요.
          </ModalSubtitle>
        </div>
        <ModalBox>{fileSelectArea}</ModalBox>
      </>
    ),
    buttonHandler: selectFileButtonHandler,
  };
};

export default KakaoFileUpload;
