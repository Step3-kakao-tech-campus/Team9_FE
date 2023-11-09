import { useRef, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { getCategoryFromEncodedId } from "../../apis/share";

import SharedBookmarkGrid from "../organisms/SharedBookmarkGrid";

const SharedCategoryPageTemplate = ({ encodedId }) => {
  const [categoryName, setCategoryName] = useState("");

  // 카테고리 이름 가져오기
  useEffect(() => {
    getCategoryFromEncodedId({
      encodedCategoryId: encodedId,
    }).then((res) => {
      setCategoryName(res?.data?.response?.categoryName);
    });
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    "bookmarkList",
    ({ pageParam = 0 }) =>
      getCategoryFromEncodedId({
        encodedCategoryId: encodedId,
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
    <div className="flex flex-col">
      <div className="mx-auto pt-20">
        <span className="text-xl font-semibold">{categoryName}</span>
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

export default SharedCategoryPageTemplate;
