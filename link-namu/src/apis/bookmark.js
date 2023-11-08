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
 * @param {string, string} param0
 * @returns
 */
// export const searchBookmark = ({ search = "", tag }) => {
//   const query = `?search=${search}${tag && `tag=${tag}`}`;
//   return instance.get("/api/bookmark/search" + query);
// };
