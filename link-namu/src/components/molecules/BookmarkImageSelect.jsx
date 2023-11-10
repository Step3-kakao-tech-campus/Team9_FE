import { useEffect, useState, useRef } from "react";
import ModalTextInput from "../atoms/ModalTextInput";

const IMAGE_TYPE = {
  URL: "image_url",
  FILE: "image_file",
};

const BookmarkImageSelect = ({ onChange }) => {
  const fileInputRef = useRef(null);
  const [selectedImageType, setSelectedImageType] = useState(IMAGE_TYPE.FILE);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [imageData, setImageData] = useState();

  useEffect(() => {
    if (selectedImageType === IMAGE_TYPE.URL) {
      setImageData({ type: IMAGE_TYPE.URL, value: selectedImageUrl });
    } else if (selectedImageType === IMAGE_TYPE.FILE) {
      setImageData({ type: IMAGE_TYPE.FILE, value: selectedImageFile });
    }
  }, [selectedImageType, selectedImageFile, selectedImageUrl]);
  useEffect(() => {
    onChange(imageData);
  }, [onChange, imageData]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setSelectedImageFile(e.target.files[0]);
    console.log("선택된 파일", e.target.files[0]);
  };

  return (
    <div className="p-2 flex items-center rounded bg-[#ecf8fc]">
      {/* 이미지 타입 선택 영역 */}
      <div>
        {/* URL 타입 선택 radio */}
        <div className="w-[100px]">
          <input
            type="radio"
            id="urlTypeRadio"
            name="image_type"
            value={IMAGE_TYPE.URL}
            checked={selectedImageType === IMAGE_TYPE.URL}
            onChange={(e) => setSelectedImageType(e.target.value)}
          />
          <label htmlFor="urlTypeRadio">
            <span className="text-sm px-2">이미지 URL</span>
          </label>
        </div>
        {/* 파일 타입 선택 radio */}
        <div>
          <input
            type="radio"
            id="fileTypeRadio"
            name="image_type"
            value={IMAGE_TYPE.FILE}
            checked={selectedImageType === IMAGE_TYPE.FILE}
            onChange={(e) => setSelectedImageType(e.target.value)}
          />
          <label htmlFor="fileTypeRadio">
            <span className="text-sm px-2">이미지 파일</span>
          </label>
        </div>
      </div>

      {/* 이미지 파일 선택 영역 */}
      <div className="w-full flex gap-2 items-center overflow-hidden">
        {selectedImageType === IMAGE_TYPE.FILE ? (
          <>
            {/* 이미지 파일 선택 버튼 */}
            <button
              className={`block ${
                !selectedImageFile && "w-full"
              } p-3 bg-white whitespace-nowrap rounded border`}
              onClick={() => fileInputRef.current.click()}
            >
              <span className="text-sm">파일 선택</span>
            </button>
            {/* 선택된 파일 표시 영역 */}
            {selectedImageFile && (
              <input
                title={selectedImageFile.name}
                className="block w-full p-3 border rounded bg-transparent text-sm truncate"
                value={selectedImageFile.name}
                readOnly
              />
            )}
            {/* 파일 선택을 위한 input (hidden) */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </>
        ) : (
          // 이미지 URL 선택 영역
          <ModalTextInput
            value={selectedImageUrl}
            changeHandler={setSelectedImageUrl}
          />
        )}
      </div>
    </div>
  );
};

export default BookmarkImageSelect;
