import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

// Layouts
import NavbarPublic from "./Navbar/Navbar";

const PublicRoute = () => {
  useEffect(() => {
    const cookies = new Cookies();
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
  }, []);

  return (
    <>
      <NavbarPublic />
      <Outlet />
    </>
  );
};

export default PublicRoute;
