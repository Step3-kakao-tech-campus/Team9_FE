import { instance } from "./api";

/**
 * 구글 문서 연동 페이지 등록
 * @param {Object} params
 * @param {string} params.documentId - 구글 문서 ID
 * @returns
 */
export const registerGoogleDocs = ({ documentId }) => {
  return instance.post("/api/google-docs/registration", {
    documentId: documentId,
  });
};

/**
 * 구글 문서 연동 계정 삭제
 * @param {Object} params
 * @param {string} params.docspageId - 연동을 삭제할 구글 문서 ID
 * @returns
 */
export const deleteGoogleDocs = ({ docsPageId }) => {
  return instance.post(`/api/google-docs/delete/${docsPageId}`);
};
