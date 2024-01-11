import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

// Layouts
import NavbarPublic from "../../layouts/NavbarPublic/NavbarPublic";

const PublicRoute = () => {
  const cookies = new Cookies();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [checkLogin, setCheckLogin] = useState<boolean>(false);

  useEffect(() => {
    if (cookies.get("accessToken") && cookies.get("refreshToken")) {
      setIsLogin(true);
    }
    setCheckLogin(true);
  }, []);

  if (!checkLogin) {
    return <></>;
  } else if (checkLogin && isLogin) {
    return <Navigate to="/page/home" />;
  } else {
    return (
      <React.Fragment>
        <NavbarPublic />
        <Outlet />
      </React.Fragment>
    );
  }
};

export default PublicRoute;
