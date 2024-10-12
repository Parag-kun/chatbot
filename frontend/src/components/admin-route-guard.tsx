import { Outlet } from "react-router-dom";
import NotFound from "../pages/not-found";
import { useCurrentUser } from "../tanstack-queries/user";
import LoadingPage from "../pages/loading";

const AdminRouteGuard = () => {
  const { data: user, isPending } = useCurrentUser();

  if (isPending) {
    return <LoadingPage />;
  }

  if ((user as any)?.role === "ADMIN") {
    return <Outlet />;
  }

  return <NotFound />;
};

export default AdminRouteGuard;
