import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import MainPage from "./pages/MainPage";
import SignInPage from "./pages/SignInPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* 단독 레이아웃 */}
          <Route path="signin" element={<SignInPage />} />

          {/* 공통 레이아웃 */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
