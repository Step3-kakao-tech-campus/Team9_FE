import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
import MainPage from "./pages/MainPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
