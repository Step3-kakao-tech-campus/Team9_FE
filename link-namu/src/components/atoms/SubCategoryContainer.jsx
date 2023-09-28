import SubCategoryItem from "./SubCategoryItem";

const SubCategoryContainer = ({ parentCategory }) => {
  return (
    <div className="ml-3 border-l-2 border-[#d9d9d9]">
      <SubCategoryItem title={`${parentCategory}-1`} />
      <SubCategoryItem title={`${parentCategory}-2`} />
      <SubCategoryItem title={`${parentCategory}-3`} />
    </div>
  );
};

export default SubCategoryContainer;
