const ModalSubtitle = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block px-6 py-2 text-xs text-[#2B4BF2] font-semibold"
    >
      {children}
    </label>
  );
};

export default ModalSubtitle;
