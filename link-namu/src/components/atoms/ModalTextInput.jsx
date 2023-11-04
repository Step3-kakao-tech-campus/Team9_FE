import { useEffect, useState } from "react";

const ModalTextInput = ({ id, value, placeholder, changeHandler }) => {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <input
      type="text"
      id={id}
      value={text}
      placeholder={placeholder}
      onChange={(e) => {
        setText(e.target.value);
        changeHandler(e.target.value);
      }}
      className="block w-full p-3 border border-[#56678942] rounded-lg text-base"
    />
  );
};

export default ModalTextInput;
