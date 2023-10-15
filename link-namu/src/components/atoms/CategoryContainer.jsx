import CategoryItem from "./CategoryItem";

const CategoryContainer = ({ workspaceId, categories }) => {
  return (
    <div className="ml-3 border-l-2 border-[#d9d9d9]">
      {categories.map((category, index) => {
        return (
          <CategoryItem
            key={index}
            categoryId={category.categoryId}
            categoryName={category.categoryName}
          />
        );
      })}
    </div>
  );
};

export default CategoryContainer;
