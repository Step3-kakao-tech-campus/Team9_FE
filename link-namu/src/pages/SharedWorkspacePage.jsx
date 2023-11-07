import { useEffect, useState } from "react";
import { getWorkspaceFromEncodedId } from "../apis/share";
import { useReissueToken } from "../hooks/useReissueToken";

const SharedWorkspacePage = () => {
  const reissueToken = useReissueToken();
  const [isTokenReady, setIsTokenReady] = useState(false);
  const [encodedId, setEncodedId] = useState(null);
  const [workspaceName, setWorkspaceName] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    reissueToken({
      changeState: () => setIsTokenReady(true),
    });
  }, []);

  useEffect(() => {
    if (!isTokenReady) return;
    const currentUrl = window.location.href;
    const query = currentUrl?.split("?")[1];
    setEncodedId(query.split("=")[1] + "=");
  }, [isTokenReady]);

  useEffect(() => {
    if (!encodedId) return;

    getWorkspaceFromEncodedId({ encodedWorkspaceId: encodedId }).then((res) => {
      console.log("res", res);

      const data = res?.data?.response;
      setWorkspaceName(data.workSpaceName);
      setCategoryList(data.sharedCategoryList);
    });
  }, [encodedId]);

  return (
    <div>
      <h1>공유된 워크스페이스를 표시하는 페이지</h1>
      <span>{encodedId}</span>
      <div>
        <span>워크스페이스 이름 : </span>
        <span>{workspaceName}</span>
      </div>
      <div>
        <div className="grid grid-cols-5 gap-x-10 gap-y-10 m-20">
          {categoryList.map((category) => {
            return (
              <div className="" key={category.shareCategoryLink}>
                <a
                  href={
                    window.location.origin +
                    "/share-link/category/share?category=" +
                    category.shareCategoryLink
                  }
                >
                  <div className="w-full h-[200px] p-2 border overflow-hidden">
                    <h5>{category.categoryName}</h5>
                    <div className="overflow-x-ellipsis">
                      {category.shareCategoryLink}
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SharedWorkspacePage;
