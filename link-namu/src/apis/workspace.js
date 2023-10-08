import { instance } from "./api";

/**
 * 워크스페이스 리스트 조회
 * @returns
 */
export const getWorkspaceList = () => {
  return instance.get("/api/workspace/list");
};

/**
 * 워크스페이스 생성
 * @param {string} param0
 * @returns
 */
export const createWorkspace = ({ workspaceName }) => {
  return instance.post("/api/workspace/create", {
    workspaceName: workspaceName,
  });
};

/**
 * 워크스페이스 삭제
 * @param {number} param0
 * @returns
 */
export const deleteWorkspace = ({ workspaceId }) => {
  return instance.post(`/api/workspace/delete/${workspaceId}`);
};

/**
 * 워크스페이스 수정
 * @param {number, string} param0
 * @returns
 */
export const updateWorkspace = ({ workspaceId, workspaceName }) => {
  return instance.post(`api/workspace/update/${workspaceId}`, {
    workspaceName: workspaceName,
  });
};
