import { useState, useEffect } from "react";

const SearchInputText = ({ id, placeholder, value, changeHandler }) => {
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
      className=""
    />
  );
};

export default SearchInputText;
