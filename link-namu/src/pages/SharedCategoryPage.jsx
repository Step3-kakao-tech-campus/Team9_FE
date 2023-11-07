import { useEffect, useState } from "react";
import { useReissueToken } from "../hooks/useReissueToken";
import SharedCategoryPageTemplate from "../components/templates/SharedCategoryPageTemplate";

const SharedCategoryPage = () => {
  const reissueToken = useReissueToken();
  const [isTokenReady, setIsTokenReady] = useState(false);
  const [encodedId, setEncodedId] = useState(null);

  useEffect(() => {
    reissueToken({
      changeState: () => setIsTokenReady(true),
    });
  }, []);

  useEffect(() => {
    if (!isTokenReady) return;
    const currentUrl = window.location.href;
    const query = currentUrl?.split("?")[1];
    setEncodedId(query.replace("category=", ""));
  }, [isTokenReady]);

  return (
    <div>
      <h1>공유된 카테고리를 표시하는 페이지</h1>
      <span>{encodedId}</span>
      {isTokenReady && encodedId && (
        <SharedCategoryPageTemplate encodedId={encodedId} />
      )}
    </div>
  );
};

export default SharedCategoryPage;
