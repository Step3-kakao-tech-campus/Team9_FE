const ContextMenuItem = ({ handleAction, children }) => {
  return (
    <button
      className="context-menu-item block w-full text-left py-1 px-3 text-sm hover:bg-[#f6f6f6]"
      onClick={() => handleAction()}
    >
      {children}
    </button>
  );
};

export default ContextMenuItem;
