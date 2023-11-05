import { getCategoryList } from "../../apis/category";
import { useEffect, useRef, useState, startTransition } from "react";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";

import BookmarkGrid from "../organisms/BookmarkGrid";

const BookmarkGridTemplate = () => {
  const currCategoryId = useSelector(state => {
    return state.bookmark.currCategoryId;
  });
  const currCategoryName = useSelector(state => {
    return state.bookmark.currCategoryName;
  });
  const [categoryId, setCategoryId] = useState(currCategoryId);
  useEffect(() => {
    setCategoryId(currCategoryId);
  }, [currCategoryId]);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ["bookmarkList", categoryId],
    ({ pageParam = 0 }) =>
      getCategoryList({ categoryId: currCategoryId, page: pageParam }),
    {
      getNextPageParam: lastPage => {
        if (!lastPage) return undefined;
        console.log("lastPage", lastPage);
        const currentPage = lastPage.data?.response?.pageInfo?.currentPage;
        const totalPages = lastPage.data?.response?.pageInfo?.totalPages;
        return currentPage < totalPages - 1 ? currentPage + 1 : undefined;
      },
    }
  );

  const bottomObserver = useRef();
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const handleObserver = entities => {
    const target = entities[0];
    if (target.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, options);
    if (bottomObserver.current) {
      observer.observe(bottomObserver.current);
    }
    return () => {
      if (bottomObserver.current) {
        observer.unobserve(bottomObserver.current);
      }
    };
  }, [bottomObserver, hasNextPage, fetchNextPage]);

  const bookmarkList = [];
  data?.pages?.forEach(page => {
    if (page) {
      page.data?.response?.bookmarkContents?.forEach(data => {
        bookmarkList.push(data);
      });
    }
  });

  return (
    <div>
      <h1 className="text-[40px] text-center">{`현재 카테고리: ${currCategoryName} (ID: ${currCategoryId})`}</h1>
      {bookmarkList.length !== 0 && (
        <BookmarkGrid bookmarkList={bookmarkList} categoryId={currCategoryId} />
      )}
      <div ref={bottomObserver} style={{ height: "20px" }}>
        {isFetching && "Loading more..."}
      </div>
    </div>
  );
};

export default BookmarkGridTemplate;
