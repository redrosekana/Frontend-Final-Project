import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect } from "react";
import NavbarPublic from "./navbar";

const MainPublic = () => {
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

export default MainPublic;
