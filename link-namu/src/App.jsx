import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, useEffect } from "react";
import Loader from "./components/atoms/Loader";

// layouts
import MainLayout from "./layouts/MainLayout";
import ShareLinkLayout from "./layouts/ShareLinkLayout";
import SearchLayout from "./layouts/SearchLayout";
import FirstLayout from "./layouts/FirstLayout";

// pages
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";
import NotionRedirectPage from "./pages/NotionRedirectPage";
import SharedCategoryPage from "./pages/SharedCategoryPage";
import SharedWorkspacePage from "./pages/SharedWorkspacePage";
import SearchResultPage from "./pages/SearchResultPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import FirstPage from "./pages/FirstPage";

const App = () => {
  useEffect(() => {
    console.log("app");
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            {/* 단독 레이아웃 */}
            <Route path="*" element={<NotFoundPage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="notion/redirect" element={<NotionRedirectPage />} />
            <Route path="forbidden" element={<ForbiddenPage />} />

            {/* 공통 레이아웃 */}
            <Route element={<FirstLayout />}>
              <Route path="first" element={<FirstPage />} />
            </Route>
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
            <Route element={<SearchLayout />}>
              <Route path="search/result" element={<SearchResultPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
};

export default App;
