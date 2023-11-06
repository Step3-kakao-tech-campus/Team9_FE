import { useSelector } from "react-redux";
import { selectWorkspaceList } from "../store/slices/workspaceSlice";

export function useWorkspaceList() {
  const workspaceList = useSelector(selectWorkspaceList);
  return workspaceList;
}
