const Breadcrumbs = ({ workspaceName = "", categoryName = "" }) => {
  const arrow = <span className="font-semibold text-[#5c5e64]">{">"}</span>;
  return (
    <div className="inline-block p-2 my-3 border rounded-lg">
      <div className="flex items-center text-sm justify-left gap-x-2 font-medium">
        <span
          title="MAIN"
          className={`text-[#5c5e64] text-[10px] leading-3 pl-3`}
        >
          MAIN
        </span>
        {arrow}
        <span title={workspaceName} className="max-w-[300px] truncate">
          {workspaceName}
        </span>
        {arrow}
        <span title={categoryName} className="max-w-[300px] truncate">
          {categoryName}
        </span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
