const Checkbox = ({ className, id, checked, onChange, onClick }) => {
  return (
    <div className={className}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        onClick={onClick}
        // className="appearance-none w-5 h-5 border border-[#b9b9b9] rounded-[2px] cursor-pointer"
      />
    </div>
  );
};

export default Checkbox;
