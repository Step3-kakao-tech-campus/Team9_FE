import { instance } from "./api";

/**
 * 노션 연동 페이지 등록
 * @param {string} notionToken - 노션 access token
 * @param {string} pageId - 노션 페이지 ID
 * @returns
 */
export const notionRegistration = ({ notionToken, pageId }) => {
  return instance.post("/api/notion/registration", {
    accessToken: notionToken,
    pageId: pageId,
  });
};

/**
 * 노션 연동 계정 삭제
 * @returns
 */
export const notionDelete = () => {
  const notionAccountId = "";
  return instance.post(`/api/notion/delete/${notionAccountId}`);
};
