import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { profile, loading } = useSelector((state) => state.user);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
