const ContextMenuItem = ({ handleAction, children }) => {
  return (
    <div
      className="context-menu-item py-1 px-3 hover:bg-[#f6f6f6]"
      onClick={() => handleAction()}
    >
      {children}
    </div>
  );
};

export default ContextMenuItem;
