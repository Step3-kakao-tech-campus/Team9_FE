import LoginButton from "../atoms/LoginButton";

const FirstPageModal = ({
  index,
  count,
  children,
  isEnd = false,
  startHandler,
}) => {
  return (
    <div
      className={`max-w-lg p-8 m-2 bg-white rounded-md shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${
        index === count
          ? "animate-fade-in"
          : index === count + 1
          ? "animate-fade-out"
          : "hidden"
      }`}
    >
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-xl font-bold">{children}</h1>
        {!isEnd && (
          <div className="text-gray-600 delay-1000">클릭해주세요.</div>
        )}
        {isEnd && (
          <div className="flex justify-between w-full mt-2">
            <button onClick={startHandler}>처음으로</button>
            <LoginButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default FirstPageModal;
