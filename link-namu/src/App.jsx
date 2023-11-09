import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import cookies from "react-cookies";
import { reissue } from "./apis/user";
import { setToken } from "./store/slices/userSlice";
import "./App.css";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import NotionRedirectPage from "./pages/NotionRedirectPage";
import ShareLinkLayout from "./layouts/ShareLinkLayout";
import SharedCategoryPage from "./pages/SharedCategoryPage";
import SharedWorkspacePage from "./pages/SharedWorkspacePage";
import SearchResultPage from "./pages/SearchResultPage";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("app");
    const refreshToken = () => {
      const refreshToken = cookies.load("refreshToken");
      if (!refreshToken) return;

      reissue()
        .then((res) => {
          const accessToken = res.data?.response?.accessToken.split(" ")[1];
          const newRefreshToken = res.data?.response?.refreshToken;

          dispatch(
            setToken({
              accessToken: accessToken,
              refreshToken: newRefreshToken,
            })
          );
          console.log("토큰이 재발급되었습니다.", accessToken);
        })
        .catch((err) => console.log(err));
    };

    refreshToken(); // 최초에 재발급 한 번

    // 토큰을 15분마다 재발급
    const refreshTokenTimer = setInterval(refreshToken, 15 * 60 * 1000);
    // const refreshTokenTimer = setInterval(refreshToken, 15 * 1000); // text) 15초마다

    return () => clearInterval(refreshTokenTimer);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 단독 레이아웃 */}
          <Route path="signin" element={<SignInPage />} />
          <Route path="notion/redirect" element={<NotionRedirectPage />} />
          <Route path="search/result" element={<SearchResultPage />} />

          {/* 공통 레이아웃 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route element={<ShareLinkLayout />}>
            <Route
              path="share-link/workspace/share"
              element={<SharedWorkspacePage />}
            />
            <Route
              path="share-link/category/share"
              element={<SharedCategoryPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
