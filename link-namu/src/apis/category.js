import { instance } from "./api";

/**
 * 카테고리 생성
 * @param {number, string} param0
 * @returns
 */
export const createCategory = ({ workspaceId, categoryName }) => {
  return instance.post("/api/category/create", {
    workspaceId: workspaceId,
    categoryName: categoryName,
  });
};

/**
 * 카테고리 조회
 * @param {number} param0
 * @returns
 */
export const getCategoryList = ({ categoryId, page = 0 }) => {
  return instance.get(`/api/category/${categoryId}?page=${page}`);
};

/**
 * 카테고리 삭제
 * @param {number} param0
 * @returns
 */
export const deleteCategory = ({ categoryId }) => {
  return instance.post(`/api/category/delete/${categoryId}`);
};

/**
 * 카테고리 수정
 * @param {number, string} param0
 * @returns
 */
export const updateCategory = ({ categoryId, categoryName }) => {
  return instance.post(`/api/category/update/${categoryId}`, {
    categoryName: categoryName,
  });
};

/**
 * 카테고리 이동
 * @param {number, number} param0
 * @returns
 */
// export const moveCategory = ({ fromCategoryId, toCategoryId }) => {
//   return instance.post("/api/category/move", {
//     fromCategoryId: fromCategoryId,
//     toCategoryId: toCategoryId,
//   });
// };
