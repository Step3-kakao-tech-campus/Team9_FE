import { useNavigate } from "react-router-dom";
import category_icon from "../../assets/category_icon.png";

const SharedCategoryCard = ({ categoryName, url }) => {
  const navigate = useNavigate();

  return (
    <button
      title={categoryName}
      onClick={() => navigate(url)}
      className="block w-28"
    >
      <div className="w-full flex flex-col gap-y-3 items-center justify-center p-4 rounded-lg hover:bg-[#d9d9d9] ">
        <div className="w-16 h-16 rounded-full p-4 bg-[#f4f4f4] ">
          <img src={category_icon} alt={categoryName} />
        </div>
        <div className="w-full text-center">
          <span className="block truncate">{categoryName}</span>
        </div>
      </div>
    </button>
  );
};

export default SharedCategoryCard;
