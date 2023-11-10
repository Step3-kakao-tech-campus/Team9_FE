const SearchInputLabel = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor}>
      <div className="inline-block w-[30%] px-2 py-3 text-center border ">
        {children}
      </div>
    </label>
  );
};

export default SearchInputLabel;
