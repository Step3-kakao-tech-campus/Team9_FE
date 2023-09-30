import SubCategoryItem from "./SubCategoryItem";

const SubCategoryContainer = ({ parentCategory, categories }) => {
  return (
    <div className="ml-3 border-l-2 border-[#d9d9d9]">
      {categories.map((category, index) => {
        return (
          <SubCategoryItem
            key={index}
            title={category.title}
            subCategories={category.subCategories}
          />
        );
      })}
    </div>
  );
};

export default SubCategoryContainer;
