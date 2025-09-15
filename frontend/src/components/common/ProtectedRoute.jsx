import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { profile, loading } = useSelector((state) => state.user);

  // While profile is being fetched, show a loader
  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in after loading, redirect
  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  // If logged in, render child
  return children;
};

export default ProtectedRoute;
