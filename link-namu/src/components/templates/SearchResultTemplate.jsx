import { useRef, useEffect, useState, useTransition } from "react";
import { useInfiniteQuery } from "react-query";
import { searchBookmark } from "../../apis/bookmark";
import { useLocation } from "react-router-dom";

import SharedBookmarkGrid from "../organisms/SharedBookmarkGrid";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../store";

const SearchResultTemplate = ({
  bookmarkName,
  bookmarkLink,
  bookmarkDescription,
  workspaceName,
  tags,
}) => {
  const location = useLocation();
  const [startTransition, isPending] = useTransition({
    timeoutMs: 3000,
  });
  const [totalCount, setTotalCount] = useState(null);

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery(
      "SearchResultList",
      ({ pageParam = 0 }) =>
        searchBookmark({
          bookmarkName: bookmarkName,
          bookmarkLink: bookmarkLink,
          bookmarkDescription: bookmarkDescription,
          workspaceName: workspaceName,
          tags: tags,
          page: pageParam,
        }),
      {
        getNextPageParam: (lastPage) => {
          if (!lastPage) return undefined;
          console.log("lastPage", lastPage);
          const currentPage = lastPage.data?.response?.pageInfo?.currentPage;
          const totalPages = lastPage.data?.response?.pageInfo?.totalPages;
          return currentPage < totalPages - 1 ? currentPage + 1 : undefined;
        },
        onSuccess: (res) => {
          console.log("search res", res);
          const status = res.status;
          console.log(status);
        },
      }
    );

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
  }, [bottomObserver, hasNextPage, fetchNextPage, startTransition]);

  const refetchData = async () => {
    await refetch();
  };
  useEffect(() => {
    refetchData();
  }, [location.state]);
  useEffect(() => {
    console.log(
      "검색 결과 data",
      data?.pages[0]?.data?.response?.pageInfo?.totalCount
    );
    const pageInfo = data?.pages[0]?.data?.response?.pageInfo;

    setTotalCount(pageInfo?.totalCount ?? 0);
  }, [data]);

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
      <div className="text-center p-2">
        <span>{`검색 결과 총 ${totalCount}개`}</span>
      </div>

      {bookmarkList.length !== 0 && (
        <SharedBookmarkGrid bookmarkList={bookmarkList} />
      )}
      <div ref={bottomObserver} style={{ height: "20px" }}>
        {isFetching && "Loading more..."}
      </div>
    </div>
  );
};

export default SearchResultTemplate;
