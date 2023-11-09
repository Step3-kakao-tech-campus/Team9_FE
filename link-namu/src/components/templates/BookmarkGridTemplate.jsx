import { getCategoryList } from "../../apis/category";
import { useEffect, useRef, useState, startTransition } from "react";
import { useInfiniteQuery } from "react-query";
import { getAccessToken } from "../../store";

import BookmarkGrid from "../organisms/BookmarkGrid";
import Breadcrumbs from "../atoms/Breadcrumbs";

const BookmarkGridTemplate = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const currWorkspaceId = urlParams.get("workspace");
  const currCategoryId = urlParams.get("category");
  const accessToken = getAccessToken();

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery(
      ["bookmarkList", currCategoryId],
      ({ pageParam = 0 }) =>
        getCategoryList({ categoryId: currCategoryId, page: pageParam }),
      {
        getNextPageParam: (lastPage) => {
          if (!lastPage) return undefined;
          console.log("lastPage", lastPage);
          const currentPage = lastPage.data?.response?.pageInfo?.currentPage;
          const totalPages = lastPage.data?.response?.pageInfo?.totalPages;
          return currentPage < totalPages - 1 ? currentPage + 1 : undefined;
        },
      }
    );

  const refetchData = async () => {
    await refetch();
  };

  useEffect(() => {
    if (accessToken) {
      refetchData();
    }
  }, [accessToken]);

  const bottomObserver = useRef();
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const handleObserver = (entities) => {
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
  data?.pages?.forEach((page) => {
    if (page) {
      page.data?.response?.bookmarkContents?.forEach((data) => {
        bookmarkList.push(data);
      });
    }
  });

  return (
    <div>
      {currCategoryId && <Breadcrumbs workspaceName={""} categoryName={""} />}
      <BookmarkGrid bookmarkList={bookmarkList} categoryId={currCategoryId} />
      <div ref={bottomObserver} style={{ height: "20px" }}>
        {isFetching && "Loading more..."}
      </div>
    </div>
  );
};

export default BookmarkGridTemplate;
