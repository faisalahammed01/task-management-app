import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "./Loading";
import AuthContext from "../components/Auth/Authcontext";

const PrivatesRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || user === undefined) {
    return <Loading></Loading>;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} />;
};

export default PrivatesRoute;
