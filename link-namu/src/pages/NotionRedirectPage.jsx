import { useEffect } from "react";

const NotionRedirectPage = () => {
  const parentWindow = window.opener;
  const currentUrl = window.location.href;

  const getCodeFromUrl = (url) => {
    const regex = new RegExp("[?&]code(=([^&#]*)|&|#|$)");
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  useEffect(() => {
    if (!currentUrl) return;

    const code = getCodeFromUrl(currentUrl);
    if (parentWindow) {
      parentWindow.postMessage({ notionCode: code });
      window.close();
    }
  }, [currentUrl]);

  return <div>노션 연동 중...</div>;
};

export default NotionRedirectPage;
