import { useWorkspaceList } from "../hooks/useWorkspaceList";
import { Suspense } from "react";

import BookmarkGridTemplate from "../components/templates/BookmarkGridTemplate";
import Loader from "../components/atoms/Loader";

const MainPage = () => {
  const { workspaceData, isLoading, isError } = useWorkspaceList();

  return (
    <div>
      <Suspense fallback={<Loader />}>
        <BookmarkGridTemplate />
      </Suspense>
    </div>
  );
};

export default MainPage;
