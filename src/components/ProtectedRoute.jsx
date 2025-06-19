import { Navigate } from "react-router";
import { useUser } from "../context/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();

  // If not logged in, redirect to login
  if (!user) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
