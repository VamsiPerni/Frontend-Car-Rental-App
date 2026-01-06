import { Navigate, Outlet } from "react-router";
import { useAppContext } from "../contexts/appContext";

const ProtectedLayout = () => {
  const { user } = useAppContext();

  if (!user.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export { ProtectedLayout };
