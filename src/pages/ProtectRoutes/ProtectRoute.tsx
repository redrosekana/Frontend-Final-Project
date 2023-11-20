import { useState, useEffect } from "react";
import {
  Outlet,
  Navigate,
  useNavigate,
  NavigateFunction,
  useLocation,
  Location,
} from "react-router-dom";
import { isAxiosError } from "axios";
import Cookies from "universal-cookie";

// types
import { ErrorResponse } from "../../types/ErrorResponseTypes";

// hooks
import useAxios from "../../hooks/useAxios";

// utils
import { axiosRenewToken } from "../../utils/axiosRenewToken";

// context
import { Store } from "../../context/store";

// redux
import { useAppDispatch } from "../../store/hook";
import { loginRedux } from "../../store/userSlice";

// layouts
import NavbarProtect from "../../layouts/NavbarProtect/NavbarProtect";

const ProtectRoute = () => {
  const cookies = new Cookies();
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const dispatch = useAppDispatch();

  const [isScopeProfile, setIsScopeProfile] = useState<boolean>(false);

  // for check authentication
  const [permit, setPermit] = useState<boolean | string>("none");
  const [expireToken, setExpireToken] = useState<boolean>(false);

  useEffect(() => {
    setIsScopeProfile(false);
  }, [location.pathname]);

  useEffect(() => {
    useAxios("/auth/detail-user", "get", false, true)
      .then((result) => {
        dispatch(
          loginRedux({
            displayName: result.data.data.displayName,
            username: result.data.data.username,
            email: result.data.data.email,
            urlAvatar: result.data.data.urlAvatar,
            provider: result.data.data.provider,
            ownerParty: result.data.data.ownerParty,
            memberParty: result.data.data.memberParty,
          })
        );
        setPermit(true);
      })
      .catch(async (error) => {
        setPermit(false);
        if (isAxiosError(error)) {
          const data: ErrorResponse = error.response?.data;
          if (data.message === "token expired") {
            try {
              const resultRenewToken = await axiosRenewToken(
                "/auth/new-token",
                "get",
                false,
                true
              );
              cookies.set("accessToken", resultRenewToken.data.accessToken);
              cookies.set("refreshToken", resultRenewToken.data.refreshToken);
              window.location.reload();
            } catch (error) {
              setExpireToken(true);
              console.log(error);
            }
          } else {
            console.log(error);
            navigate("/login");
          }
        } else {
          console.log(error);
          navigate("/login");
        }
      });
  }, []);

  if (permit === "none") {
    return <></>;
  } else if (!permit && expireToken) {
    return <Navigate to="/login" />;
  } else {
    return (
      <Store.Provider value={{ isScopeProfile, setIsScopeProfile }}>
        <NavbarProtect />
        <Outlet />
      </Store.Provider>
    );
  }
};

export default ProtectRoute;
