import { useEffect, useState } from "react";
import SharedCategoryPageTemplate from "../components/templates/SharedCategoryPageTemplate";

const SharedCategoryPage = () => {
  const [encodedId, setEncodedId] = useState(null);

  useEffect(() => {
    const currentUrl = window.location.href;
    const query = currentUrl?.split("?")[1];
    setEncodedId(query.replace("category=", ""));
  }, []);

  return (
    <div>
      {encodedId && <SharedCategoryPageTemplate encodedId={encodedId} />}
    </div>
  );
};

export default SharedCategoryPage;
