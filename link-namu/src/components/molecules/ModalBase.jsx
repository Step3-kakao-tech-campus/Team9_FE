const modalSize = {
  sm: "w-[15rem]",
  md: "w-[30rem]",
  lg: "w-[55rem]",
  xl: "w-[70rem]",
};
const fixedPositionCenter =
  "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]";

/**
 * 기본 모달 창 컴포넌트
 * @param {'sm', 'md', 'lg', 'xl'} size - 모달 창의 크기
 * @param {string} titleName - 모달 창의 제목
 * @param {string} prevName - 모달 창 이전 버튼 이름
 * @param {string} nextName - 모달 창 다음 버튼 이름
 * @param {React.JSX.Element} children - 모달 창 내부 컴포넌트
 */
const ModalBase = ({
  size = "md",
  titleName = "제목",
  prevName = "이전",
  nextName = "다음",
  children,
}) => {
  return (
    <div
      className={`${fixedPositionCenter} ${modalSize[size]} z-50 mx-auto overflow-y-auto bg-white rounded shadow-lg`}
    >
      {/* 모달창 내부 */}
      <div className="relative px-6 py-4 text-xl font-bold text-left">
        {titleName}
      </div>
      <div className="relative px-6 py-4 text-left">{children}</div>
      <div className="flex justify-between mt-4">
        <button className="m-4 text-gray-600 hover:text-gray-800">
          &#xE000; {prevName}
        </button>
        <button className="px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          {nextName} &#xE001;
        </button>
      </div>
    </div>
  );
};

export default ModalBase;
