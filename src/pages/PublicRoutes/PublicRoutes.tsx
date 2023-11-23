import { useEffect } from "react";
import { Outlet } from "react-router-dom";

// hooks
import useCookie from "../../hooks/useCookie";

// Layouts
import NavbarPublic from "./Navbar/Navbar";

const PublicRoute = () => {
  const [accessToken, setAccessToken] = useCookie("accessToken", null);
  const [refreshToken, setRefreshToken] = useCookie("refreshToken", null);

  useEffect(() => {
    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  return (
    <>
      <NavbarPublic />
      <Outlet />
    </>
  );
};

export default PublicRoute;
