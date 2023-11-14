import { instance } from "./api";

/**
 * 북마크 생성
 * @param {string, string, string, number, string, array} param0
 */
export const createBookmark = ({
  bookmarkName,
  bookmarkLink,
  bookmarkDescription = "",
  categoryId,
  imageUrl = null,
  tags = [],
}) => {
  return instance.post("/api/bookmark/create", {
    bookmarkName: bookmarkName,
    bookmarkLink: bookmarkLink,
    bookmarkDescription: bookmarkDescription,
    categoryId: categoryId,
    imageUrl: imageUrl,
    tags: tags,
  });
};

/**
 * 북마크 삭제
 * @param {number} param0
 * @returns
 */
export const deleteBookmark = ({ bookmarkId }) => {
  return instance.post(`api/bookmark/delete/${bookmarkId}`);
};

/**
 * 북마크 수정
 * @param {number, string, string} param0
 * @returns
 */
export const updateBookmark = ({ bookmarkId, bookmarkName, description }) => {
  return instance.post(`/api/bookmark/update/${bookmarkId}`, {
    bookmarkName: bookmarkName,
    description: description,
  });
};

/**
 * 북마크 이미지 수정
 * @param {Object} params
 * @param {number} params.bookmarkId - 북마크 ID
 * @param {string} params.imageUrl - base64로 변환한 이미지 또는 이미지 URL
 * @returns
 */
export const updateBookmarkImage = ({ bookmarkId, imageUrl }) => {
  return instance.post(`/api/bookmark/image/update/${bookmarkId}`, {
    imageUrl: imageUrl,
  });
};

/**
 * 북마크 이동
 * @param {array, number} param0
 * @returns
 */
export const moveBookmark = ({ bookmarkIdList, toCategoryId }) => {
  return instance.post("/api/bookmark/move", {
    bookmarkIdList: bookmarkIdList,
    toCategoryId: toCategoryId,
  });
};

/**
 * 북마크 조회
 * @param {Object} params
 * @param {number} params.bookmarkId - 조회할 북마크 ID
 * @returns
 */
export const getBookmark = ({ bookmarkId }) => {
  return instance.get(`/api/bookmark/${bookmarkId}`);
};

/**
 * 북마크 검색
 * @param {Object} params
 * @param {string} params.bookmarkName - 북마크 이름에서 검색할 키워드
 * @param {string} params.bookmarkLink - 북마크 링크에서 검색할 키워드
 * @param {string} params.bookmarkDescription - 북마크 설명에서 검색할 키워드
 * @param {string} params.workspaceName - 워크스페이스 이름에서 검색할 키워드
 * @param {string[]} params.tags - 검색할 태그
 * @returns
 */
export const searchBookmark = ({
  bookmarkName = null,
  bookmarkLink = null,
  bookmarkDescription = null,
  workspaceName = null,
  tags = null,
  page = 0,
}) => {
  return instance.post(`/api/bookmark/search?page=${page}`, {
    bookmarkName: bookmarkName,
    bookmarkLink: bookmarkLink,
    bookmarkDescription: bookmarkDescription,
    workspaceName: workspaceName,
    tags: tags,
  });
};

/**
 * 최근 등록한 북마크 리스트 조회
 * @returns
 */
export const recentBoookmark = ({ page = 0 }) => {
  return instance.get(`/api/bookmark/list?page=${page}`);
};
