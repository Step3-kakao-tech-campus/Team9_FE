/**
 * 모달창을 띄울 때 사용하는 백드롭 컴포넌트
 * @param {Function} onClick - 클릭 이벤트 핸들러 함수
 * @returns
 */
const Overlay = ({ onClick }) => {
  return (
    <div className="fixed inset-0 bg-black opacity-50" onClick={onClick}></div>
  );
};

export default Overlay;
