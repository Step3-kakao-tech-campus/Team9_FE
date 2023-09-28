import React, { useState } from 'react';

const modalSize = {
  sm : '300px',
  md : '600px',
  lg : '900px',
  xl : '1200px'
}

const ModalBase = ({ size, buttonName, titleName, prevName, nextName, children}) => {
  const [isOpen, setIsOpen] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    setIsOpen(true);
  }

  // 모달 닫기 함수
  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <div>
      {/* 테스트용 모달 열기 버튼 */}
      <button onClick={openModal} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700">
        {buttonName}
        버튼 이름
      </button>
      
      {/* 모달 열린 상태일 때만 모달 창을 표시 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 모달창 외부 */}
          <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
          <div className="z-50 w-11/12 mx-auto overflow-y-auto bg-white rounded shadow-lg md:max-w-md">
            {/* 모달창 내부 */}
            <div className="relative px-6 py-4 font-bold text-left">
              제목
              {titleName}
            </div>
            <div className="relative px-6 py-4 text-left">              
              내부 컨텐츠
              {children}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className='m-4 text-gray-600 hover:text-gray-800'
              >
                &#xE000; 이전 {prevName}
              </button>
              <button
                className='px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
              >
                다음 {nextName} &#xE001;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalBase;