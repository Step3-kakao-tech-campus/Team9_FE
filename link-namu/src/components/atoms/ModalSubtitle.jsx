const ModalSubtitle = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block py-2 text-sm text-[rgba(0, 0, 0, 0.60)]"
    >
      {children}
    </label>
  );
};

export default ModalSubtitle;
