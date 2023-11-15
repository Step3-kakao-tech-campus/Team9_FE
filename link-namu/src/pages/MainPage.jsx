import { useWorkspaceList } from "../hooks/useWorkspaceList";
import { Suspense, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRefreshToken } from "../utils/auth";
import { removeTokens } from "../utils/auth";
import { useLocation } from "react-router-dom";

import BookmarkGridTemplate from "../components/templates/BookmarkGridTemplate";
import RecentBookmarkGridTemplate from "../components/templates/RecentBookmarkGridTemplate";
import Loader from "../components/atoms/Loader";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { workspaceData, isLoading, isError } = useWorkspaceList();
  const [currWorkspaceId, setCurrWorkspaceId] = useState(null);
  const [currCategoryId, setCurrCategoryId] = useState(null);

  useEffect(() => {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    setCurrWorkspaceId(urlParams.get("workspace"));
    setCurrCategoryId(urlParams.get("category"));
  }, [location.search]);

  console.log("main page");
  if (!getRefreshToken()) {
    removeTokens();
    navigate("/signin");
  }

  return (
    <div>
      <Suspense fallback={<Loader />}>
        {currCategoryId ? (
          <BookmarkGridTemplate
            currWorkspaceId={currWorkspaceId}
            currCategoryId={currCategoryId}
          />
        ) : (
          <RecentBookmarkGridTemplate />
        )}
      </Suspense>
    </div>
  );
};

export default MainPage;
