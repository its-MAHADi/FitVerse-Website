import { Navigate, useLocation } from "react-router";
import UseAuth from "../Hooks/UseAuth";

export const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading || !user) return <div className="text-center py-20 text-xl">Loading...</div>;

  if (user.role !== "admin") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export const TrainerRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading || !user) return <div className="text-center py-20 text-xl">Loading...</div>;

  if (user.role !== "trainer") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};

export const MemberRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();

  if (loading || !user) return <div className="text-center py-20 text-xl">Loading...</div>;

  if (user.role !== "member") {
    return <Navigate to="/dashboard" state={{ from: location }} replace />;
  }

  return children;
};
