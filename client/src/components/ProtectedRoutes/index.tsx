import { useContext } from "react";
import ReactLoading from "react-loading";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

export const ProtectedRoutes = () => {
  const { user, waitRequest } = useContext(UserContext);
  const location = useLocation();

  if (waitRequest)
    <ReactLoading type="cylon" color="#111827" height={100} width={100} />;

  return user ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
};
