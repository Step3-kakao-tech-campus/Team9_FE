import { useSelector } from "react-redux";
import { getWorkspaceList } from "../store/slices/workspaceSlice";

const useCategoryName = () => {
  const workspaceList = useSelector(getWorkspaceList);

  const getCategoryName = (categoryId) => {
    const foundCategory = workspaceList
      .flatMap((workspace) => workspace.categoryList)
      .find((category) => category.categoryId === Number(categoryId));

    return foundCategory ? foundCategory.categoryName : "";
  };

  return getCategoryName;
};

export { useCategoryName };
