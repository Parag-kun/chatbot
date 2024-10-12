import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootPage from "./pages/root";
import AdminPanel from "./pages/admin-panel";
import NotFound from "./pages/not-found";
import AdminRouteGuard from "./components/admin-route-guard";
import AdminViewPage from "./pages/admin-view";

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootPage />} />
        <Route element={<AdminRouteGuard />}>
          <Route path="/admin-view" element={<AdminViewPage />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
