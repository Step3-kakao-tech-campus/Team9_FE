import { useState, useRef, useEffect } from "react";
import { sendMe } from "../../apis/kakao";
import file_icon from "../../assets/paper_icon.png";
import upload_cloud from "../../assets/upload_cloud.png";
import MultiStepModalBase from "./MultiStepModalBase";
import BookmarkSelectItem from "../atoms/BookmarkSelectItem";
import Checkbox from "../atoms/Checkbox";

const KakaoFileUploadModal = () => {
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [linkList, setLinkList] = useState([]);
  const fileInput = useRef(null);
  const [checkState, setCheckState] = useState();

  // 파일 선택 핸들러
  const handleUpload = (e) => {
    fileInput.current.click();
  };
  const handleChange = (e) => {
    console.log("selected file: ", e.target.files[0]);
    if (e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  const removeFile = () => {
    fileInput.current.value = "";
    setSelectedFile(null);
    setLinkList([]);
  };
  const sendMeHandler = () => {
    console.log("file: ", selectedFile);
    sendMe({ file: selectedFile })
      .then((res) => {
        console.log("send me: ", res.data?.response);
        setLinkList(res.data?.response);
      })
      .catch((err) => console.log(err));
  };
  const selectFileButtonHandler = () => {
    try {
      if (!isFileSelected) throw new Error("파일을 선택해주세요.");
    } catch (err) {
      alert(err.message);
      throw new Error();
    }
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

  const page1 = (
    <div>
      <div className="mx-auto mt-5 text-center">
        <h2 className="text-xl mb-4">카카오톡에서 가져오기</h2>
        <span className="text-sm text-[rgba(0, 0, 0, 0.60)]">
          카카오톡에서 내보내기한 파일을 선택해주세요.
        </span>
      </div>
      {fileSelectArea}
    </div>
  );

  ////////////////////////////////////////////////////////////////

  const [isAllChecked, setIsAllChecked] = useState(false);
  const [checkedIdList, setCheckedIdList] = useState([]);

  const handleSelectAllClick = () => {
    if (selectAllCheckbox && selectAllCheckbox.checked) {
      const arr = [];
      for (let i = 0; i < linkList.length; i++) {
        arr.push(i);
      }
      setCheckedIdList(arr);
    } else {
      setCheckedIdList([]);
    }
  };
  const handleSelectAllChange = (e) => {
    setIsAllChecked(e.target.checked);
  };
  const handleCheckedChange = (checked, id) => {
    if (checked) {
      setCheckedIdList([...checkedIdList, id]);
    } else {
      setCheckedIdList(checkedIdList.filter((el) => el !== id));
    }
  };
  useEffect(() => {
    console.log("isAllChecked : ", isAllChecked);
    console.log("checkedIdList : ", checkedIdList);
  }, [checkedIdList, isAllChecked]);

  useEffect(() => {
    if (linkList.length !== 0)
      setIsAllChecked(checkedIdList.length === linkList.length);
  }, [checkedIdList]);
  useEffect(() => {}, [isAllChecked]);
  const selectAllCheckbox = document.getElementById("selectAllCheckbox");
  const page2 = (
    <div>
      <div className="mx-auto mt-5 text-center">
        <h2 className="text-xl mb-4">발견된 링크</h2>
        <span className="text-sm text-[rgba(0, 0, 0, 0.60)]">
          추가할 링크를 선택해주세요.
        </span>
      </div>

      {linkList.length === 0 && <div>발견된 링크가 없습니다.</div>}
      {linkList.length > 0 && (
        <div className="mx-auto px-5">
          <div className="float-right flex gap-x-3 pr-10">
            <span>전체 선택</span>
            <Checkbox
              id="selectAllCheckbox"
              checked={isAllChecked}
              onChange={handleSelectAllChange}
              onClick={handleSelectAllClick}
            />
          </div>
          <ul className="h-[450px] w-[800px] mx-auto p-2 overflow-y-scroll overflow-x-clip">
            {linkList.map((item, index) => {
              return (
                <li key={index}>
                  <BookmarkSelectItem
                    id={index}
                    checked={checkedIdList.includes(index)}
                    handleCheckedChange={(e) => {
                      handleCheckedChange(e.target.checked, index);
                    }}
                    url={item.link}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
  const addBookmarkList = () => {};

  const contentList = [];
  contentList.push({
    content: page1,
    buttonHandler: selectFileButtonHandler,
  });
  contentList.push({
    content: page2,
    title: "선택한 북마크 추가",
    buttonHandler: addBookmarkList,
  });

  return <MultiStepModalBase size="lg">{contentList}</MultiStepModalBase>;
};

export default KakaoFileUploadModal;
