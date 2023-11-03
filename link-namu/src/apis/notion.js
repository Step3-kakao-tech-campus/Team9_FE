import { instance } from "./api";

/**
 * 노션 연동 페이지 등록
 * @param {Object} params
 * @param {string} params.notionCode - 노션 code
 * @param {string} params.notionPageId - 노션 페이지 ID
 * @returns {Promise}
 */
export const notionRegistration = ({ notionCode, notionPageId }) => {
  return instance.post("/api/notion/registration", {
    code: notionCode,
    pageId: notionPageId,
  });
};

/**
 * 노션 연동 계정 삭제
 * @returns
 */
export const notionDelete = ({ notionAccountId }) => {
  if (!notionAccountId) {
    throw new Error();
  }
  return instance.post(`/api/notion/delete/${notionAccountId}`);
};
