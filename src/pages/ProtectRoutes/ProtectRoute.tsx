import React, { useState, useEffect } from "react";
import { isAxiosError } from "axios";
import { Outlet, Navigate, useNavigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

// types
import { ErrorResponse } from "../../types/ErrorResponseTypes";

// hooks
import useAxios from "../../hooks/useAxios";
import useAxiosRenewToken from "../../hooks/useAxiosRenewToken";

// context
import { Store } from "../../context/store";

// redux
import { useAppDispatch } from "../../store/hook";
import { loginRedux } from "../../store/userSlice";

// utils
import renewToken from "../../utils/renewToken";

// layouts
import NavbarProtect from "../../layouts/NavbarProtect/NavbarProtect";

const ProtectRoute = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const cookies = new Cookies();

  const [isVerifyAccessToken, setIsVerifyAccessToken] =
    useState<boolean>(false);
  const [permitFromAccessToken, setPermitFromAccessToken] =
    useState<boolean>(false);
  const [isRenewToken, setIsRenewToken] = useState<boolean>(false);
  const [permitFromRenewToken, setPermitFromRenewToken] =
    useState<boolean>(false);
  const [isScopeProfile, setIsScopeProfile] = useState<boolean>(false);

  useEffect(() => {
    setIsScopeProfile(false);
  }, [location.pathname]);

  useEffect(() => {
    useAxios("/auth/detail-user", "get", false, true)
      .then((result) => {
        dispatch(loginRedux(result.data.data));
        setIsVerifyAccessToken(true);
        setPermitFromAccessToken(true);
      })
      .catch(async (error) => {
        setIsVerifyAccessToken(true);
        setPermitFromAccessToken(false);

        if (isAxiosError(error)) {
          const data: ErrorResponse = error.response?.data;
          if (data.message === "token expired") {
            try {
              await renewToken();
              const updateUser = await useAxios(
                "/auth/detail-user",
                "get",
                false,
                true
              );
              dispatch(loginRedux(updateUser.data.data));
              setIsRenewToken(true);
              setPermitFromRenewToken(true);
            } catch (error) {
              setIsRenewToken(true);
              setPermitFromRenewToken(false);
              cookies.remove("accessToken");
              cookies.remove("refreshToken");
            }
          } else {
            navigate("/login");
          }
        } else {
          navigate("/login");
        }
      });
  }, []);

  if (!isVerifyAccessToken) {
    return <React.Fragment></React.Fragment>;
  } else if (isVerifyAccessToken && permitFromAccessToken) {
    return (
      <Store.Provider value={{ isScopeProfile, setIsScopeProfile }}>
        <NavbarProtect />
        <Outlet />
      </Store.Provider>
    );
  } else if (!isRenewToken) {
    return <React.Fragment></React.Fragment>;
  } else if (isRenewToken && permitFromRenewToken) {
    return (
      <Store.Provider value={{ isScopeProfile, setIsScopeProfile }}>
        <NavbarProtect />
        <Outlet />
      </Store.Provider>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectRoute;
