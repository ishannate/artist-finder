import type { FC } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { SongsPage } from "./pages/SongsPage/SongsPage";

const RouterComponent: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/songs" element={<SongsPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export { RouterComponent };
