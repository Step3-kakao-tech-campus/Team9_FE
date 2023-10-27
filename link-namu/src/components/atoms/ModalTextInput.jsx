const ModalTextInput = ({ id, placeholder, changeHandler }) => {
  return (
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      onChange={changeHandler}
      className="block w-full border p-4 text-base rounded-lg"
    />
  );
};

export default ModalTextInput;
