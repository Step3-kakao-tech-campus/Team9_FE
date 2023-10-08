import React, { useState } from 'react';

const modalSize = {
  sm : 'w-[15rem]',
  md : 'w-[30rem]',
  lg : 'w-[55rem]',
  xl : 'w-[70rem]'
}

/**
 * 기본 모달 창 컴포넌트
 * @param {'sm', 'md', 'lg', 'xl'} size - 모달 창의 크기
 * @param {string} buttonName - 모달 창을 여는 버튼의 이름
 * @param {string} titleName - 모달 창의 제목
 * @param {string} prevName - 모달 창 이전 버튼 이름
 * @param {string} nextName - 모달 창 다음 버튼 이름
 * @param {React.JSX.Element} children - 모달 창 내부 컴포넌트
 */ 
const ModalBase = ({ size = 'md', buttonName = '확인', titleName = '제목', prevName = '이전', nextName = '다음', children}) => {
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
      </button>
      
      {/* 모달 열린 상태일 때만 모달 창을 표시 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* 모달창 외부 */}
          <div className="fixed inset-0 bg-black opacity-50 cursor-pointer" onClick={closeModal}></div>
          <div className={`z-50 mx-auto overflow-y-auto bg-white rounded shadow-lg ${modalSize[size]}`}>
            {/* 모달창 내부 */}
            <div className="relative px-6 py-4 text-xl font-bold text-left">
              {titleName}
            </div>
            <div className="relative px-6 py-4 text-left">
              {children}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className='m-4 text-gray-600 hover:text-gray-800'
              >
                &#xE000; {prevName}
              </button>
              <button
                className='px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
              >
                {nextName} &#xE001;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalBase;