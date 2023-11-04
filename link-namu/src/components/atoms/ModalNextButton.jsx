const ModalNextButton = ({ clickHandler, children = "다음" }) => {
  return (
    <button
      onClick={clickHandler}
      className="px-4 py-2  font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

export default ModalNextButton;
