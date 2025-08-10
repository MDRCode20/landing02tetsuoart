import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Debes iniciar sesión primero");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
