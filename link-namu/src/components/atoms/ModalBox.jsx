const ModalBox = ({ children }) => {
  return (
    <div className="relative flex flex-col gap-y-5 px-4 text-left">
      {children}
    </div>
  );
};

export default ModalBox;
