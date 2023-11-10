import { instance } from "./api";

/**
 * 워크스페이스 공유 링크 생성
 * @param {Object} params
 * @param {number} params.workspaceId - 워크스페이스 ID
 * @returns {Promise}
 */
export const createWorkspaceShareLink = ({ workspaceId }) => {
  return instance.get(`/api/share/workspace/${workspaceId}`);
};

/**
 * 카테고리 공유 링크 생성
 * @param {Object} params
 * @param {number} params.categoryId - 카테고리 ID
 * @returns {Promise}
 */
export const createCategoryShareLink = ({ categoryId }) => {
  return instance.get(`/api/share/category/${categoryId}`);
};

/**
 * 암호화된 워크스페이스 ID로 워크스페이스 가져오기
 * @param {Object} params
 * @param {string} params.encodedWorkspaceId - 암호화된 워크스페이스 ID
 * @param {number} params.page - 가져올 페이지
 * @returns
 */
export const getWorkspaceFromEncodedId = ({ encodedWorkspaceId }) => {
  const urlEncoded = encodeURIComponent(encodedWorkspaceId);
  return instance.get(`/api/share/workspace/link/${urlEncoded}`);
};

/**
 * 암호화된 카테고리 ID로 카테고리 가져오기
 * @param {Object} params
 * @param {string} params.encodedCategoryId - 암호화된 카테고리 ID
 * @returns
 */
export const getCategoryFromEncodedId = ({ encodedCategoryId, page = 0 }) => {
  const urlEncoded = encodeURIComponent(encodedCategoryId);
  return instance.get(`/api/share/category/link/${urlEncoded}?page=${page}`);
};

/**
 * 암호화된 워크스페이스 ID로 워크스페이스 추가하기
 * @param {Object} params
 * @param {string} params.encodedWorkspaceId - 암호화된 워크스페이스 ID
 * @returns
 */
export const addWorkspaceFromEncodedId = ({ encodedWorkspaceId }) => {
  const urlEncoded = encodeURIComponent(encodedWorkspaceId);
  return instance.post(`/api/share/workspace/link/${urlEncoded}`);
};

/**
 * 암호화된 카테고리 ID로 카테고리 추가하기
 * @param {Object} params
 * @param {string} params.encodedCategoryId - 암호화된 카테고리 ID
 * @returns
 */
export const addCategoryFromEncodedId = ({
  workspaceId,
  encodedCategoryId,
}) => {
  const urlEncoded = encodeURIComponent(encodedCategoryId);
  return instance.post(`/api/share/category/link/${urlEncoded}`, {
    workSpaceId: workspaceId,
  });
};
