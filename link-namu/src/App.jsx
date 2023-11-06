import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 단독 레이아웃 */}
          <Route path="signin" element={<SignInPage />} />
          <Route path="notion/redirect" element={<NotionRedirectPage />} />

          {/* 공통 레이아웃 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
          </Route>
          <Route element={<ShareLinkLayout />}>
            <Route
              path="share-link/workspace"
              element={<SharedWorkspacePage />}
            />
            <Route
              path="share-link/category"
              element={<SharedCategoryPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
