import { useEffect, useState } from "react";
import SharedBookmarkGrid from "../components/organisms/SharedBookmarkGrid";
import { recentBoookmark } from "../apis/bookmark";

const FirstAccessPage = () => {
  const [bookmarkList, setBookmarkList] = useState([]);

  useEffect(() => {
    recentBoookmark().then(res => {
      if (res.status === 200) {
        console.log(res);
        setBookmarkList(res.data.response);
      }
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="m-4 text-3xl">최근 추가한 북마크</h1>
      <SharedBookmarkGrid bookmarkList={bookmarkList} />
    </div>
  );
};

export default FirstAccessPage;
