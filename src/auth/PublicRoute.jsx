import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (role) {
    if (role === "SHOPKEEPER") return <Navigate to="/shopkeeper/dashboard" />;
    if (role === "USER") return <Navigate to="/user/dashboard" />;
    if (role === "EMPLOYEE") return <Navigate to="/employee/dashboard" />;
  }

  return children;
};

export default PublicRoute;