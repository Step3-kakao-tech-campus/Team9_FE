import { useSelector } from "react-redux";
import { getWorkspaceList } from "../store/slices/workspaceSlice";

const useWorkspaceName = () => {
  const workspaceList = useSelector(getWorkspaceList);

  const getWorkspaceName = (workspaceId) => {
    const foundWorkspace = workspaceList.find(
      (workspace) => workspace.workspaceId === Number(workspaceId)
    );

    return foundWorkspace?.workspaceName || "";
  };

  return getWorkspaceName;
};

export { useWorkspaceName };
