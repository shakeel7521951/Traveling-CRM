// ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { profile, loading } = useSelector((state) => state.user);

  console.log("profile data in protected route.....", profile);

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  if (!profile) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
