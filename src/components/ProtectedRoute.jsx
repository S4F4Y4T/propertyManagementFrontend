import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "@/providers/AuthProvider.jsx";

const ProtectedRoute = ({ allowedUser }) => {

  const { isLoggedIn, userData, loading } = useAuth();
  const location = useLocation();

    if (loading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!allowedUser?.includes(userData?.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
