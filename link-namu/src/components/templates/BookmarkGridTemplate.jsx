import { getCategoryList } from "../../apis/category";
import { useEffect, useRef, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";

import Card from "../molecules/Card";
import BookmarkGrid from "../organisms/BookmarkGrid";

const BookmarkGridTemplate = () => {
  // const categoryId = 2;
  // const bottomObserver = useRef(null);
  // const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
  //   queryKey: "bookmarkList",
  //   queryFn: ({ pageParam = 0 }) =>
  //     getCategoryList({ categoryId: categoryId, page: pageParam }),
  //   getNextPageParam: (lastPage, allPages) => {
  //     const currPageNo = lastPage.data?.response?.pageInfo.currentPage;
  //     const totalPage = lastPage.data?.response?.pageInfo.totalPages;
  //     return currPageNo === totalPage - 1 ? allPages.length : undefined;
  //   },
  // });

  // const bookmarkList = []; // TODO: useMemo로 변경
  // data?.pages.forEach((page) => {
  //   console.log("page", page.data?.response?.bookmarkContents);
  //   bookmarkList.push(page.data?.response?.bookmarkContents);
  // });

  // useEffect(() => {
  //   const io = new IntersectionObserver(
  //     (entries, observer) => {
  //       entries.forEach((entry) => {
  //         if (!entry.isIntersecting) return;
  //         if (entry.isIntersecting && hasNextPage && bottomObserver.current) {
  //           console.log("not working");
  //           fetchNextPage();
  //         }
  //       });
  //     },
  //     { threshold: 0.5 }
  //   );

  //   io.observe(bottomObserver.current);
  //   return () => io.disconnect();
  // }, []); // 최초 렌더링 마운트 1회만 선언

  const [bookmarkList, setBookmarkList] = useState([]);
  const currCategoryId = useSelector((state) => {
    return state.bookmark.currCategoryId;
  });
  const currCategoryName = useSelector((state) => {
    return state.bookmark.currCategoryName;
  });
  useEffect(() => {
    getCategoryList({ categoryId: currCategoryId, page: 0 }).then((res) => {
      setBookmarkList(res.data?.response?.bookmarkContents);
    });
    console.log(bookmarkList);
  }, [currCategoryId]);

  return (
    <div>
      <h1 className="text-[40px] text-center">{`현재 카테고리: ${currCategoryName} (ID: ${currCategoryId})`}</h1>
      <BookmarkGrid bookmarkList={bookmarkList} />
      {/* <div ref={bottomObserver}></div> */}
    </div>
  );
};

export default BookmarkGridTemplate;
