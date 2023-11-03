import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectWorkspaceList } from "../../store/slices/workspaceSlice";
import { useEffect, useState } from "react";

/**
 * 워크스페이스의 카테고리 리스트를 옵션으로 가지는 select box 컴포넌트
 * @param {number} workspaceId - 카테고리를 옵션으로 표시할 워크스페이스의 ID
 * @returns
 */
const CategorySelectBox = ({
  workspaceId = () => {},
  value = null,
  isSlimType = false,
  changeHandler,
  disabled = false,
}) => {
  const workspaceList = useSelector(selectWorkspaceList).workspaceList;
  const [selectedId, setSelectedId] = useState(value);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    if (!workspaceId || !workspaceList) return;
    const selectedWorkspace = workspaceList.find((workspace) => {
      return workspace.workspaceId === workspaceId;
    });

    if (selectedWorkspace) {
      setCategoryList(selectedWorkspace.categoryList);
    }
  }, [workspaceList, workspaceId]);

  const handleChange = (e) => {
    if (e.target.value) {
      changeHandler(Number(e.target.value));
      setSelectedId(e.target.value);
    }
  };

  return (
    <select
      onChange={handleChange}
      value={selectedId}
      disabled={`${disabled ? "disabled" : ""}`}
      className={`w-full ${
        isSlimType ? "p-1" : "p-3"
      } rounded-lg bg-white border border-[#56678942]`}
    >
      <option key={0} value="" selected disabled>
        == 카테고리 선택 ==
      </option>
      {categoryList &&
        categoryList.map((category) => {
          return (
            <option
              key={category.categoryId}
              value={category.categoryId}
              className=""
            >
              {category.categoryName}
            </option>
          );
        })}
    </select>
  );
};

export default CategorySelectBox;
