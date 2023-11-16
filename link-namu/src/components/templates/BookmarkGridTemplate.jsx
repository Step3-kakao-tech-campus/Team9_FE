import { getCategoryList } from "../../apis/category";
import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { getAccessToken } from "../../store";
import { useNavigate } from "react-router-dom";
import BookmarkGrid from "../organisms/BookmarkGrid";
import Breadcrumbs from "../atoms/Breadcrumbs";
import { useWorkspaceName } from "../../hooks/useWorkspaceName";
import { useCategoryName } from "../../hooks/useCategoryName";

const BookmarkGridTemplate = ({ currWorkspaceId, currCategoryId }) => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const getWorkspaceName = useWorkspaceName();
  const getCategoryName = useCategoryName();

  const { data, fetchNextPage, hasNextPage, isFetching, refetch } =
    useInfiniteQuery(
      ["bookmarkList", currCategoryId],
      ({ pageParam = 0 }) =>
        getCategoryList({ categoryId: currCategoryId, page: pageParam }),
      {
        getNextPageParam: (lastPage) => {
          if (!lastPage) return undefined;
          // console.log("lastPage", lastPage);
          const currentPage = lastPage.data?.response?.pageInfo?.currentPage;
          const totalPages = lastPage.data?.response?.pageInfo?.totalPages;
          return currentPage < totalPages - 1 ? currentPage + 1 : undefined;
        },
        onSuccess: (res) => {
          const status = res.pages[0]?.status;

          if (status === 404) {
            navigate("/notfound");
          } else if (status === 403) {
            navigate("/forbidden");
          } else if (status === 401) {
            navigate("/");
          }
        },
      }
    );

  const refetchData = async () => {
    await refetch();
  };

  useEffect(() => {
    if (!accessToken) {
    }
  }, [accessToken]);
  useEffect(() => {
    console.log("workspace", currWorkspaceId, "category", currCategoryId);
    refetch();
  }, [currCategoryId]);

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
    <div className="w-full mx-auto flex justify-center">
      <div className="w-auto mx-auto px-10">
        {currCategoryId && (
          <Breadcrumbs
            workspaceName={getWorkspaceName(currWorkspaceId)}
            categoryName={getCategoryName(currCategoryId)}
          />
        )}
        <BookmarkGrid
          bookmarkList={bookmarkList}
          categoryId={currCategoryId}
          handleRefetch={refetchData}
        />
        <div ref={bottomObserver} style={{ height: "20px" }}>
          {isFetching && "Loading more..."}
        </div>
      </div>
    </div>
  );
};

export default BookmarkGridTemplate;
