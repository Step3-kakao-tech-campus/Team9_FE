const ModalPrevButton = ({ clickHandler, children = "이전" }) => {
  return (
    <button
      onClick={clickHandler}
      className="py-2 text-gray-600 hover:text-gray-800"
    >
      &#xE000; {children}
    </button>
  );
};

export default ModalPrevButton;
