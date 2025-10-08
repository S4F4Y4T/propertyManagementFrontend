import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "@/providers/AuthProvider.jsx";

const PublicRoute = ({ allowedUser }) => {

  const { isLoggedIn, userData } = useAuth();
  const location = useLocation();

  if (isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
