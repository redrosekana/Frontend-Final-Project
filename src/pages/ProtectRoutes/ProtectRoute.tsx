import { useState, useEffect } from "react";
import { isAxiosError } from "axios";
import {
  Outlet,
  Navigate,
  useNavigate,
  NavigateFunction,
  useLocation,
  Location,
} from "react-router-dom";

// types
import { ErrorResponse } from "../../types/ErrorResponseTypes";

// hooks
import useAxios from "../../hooks/useAxios";
import useCookie from "../../hooks/useCookie";
import useAxiosRenewToken from "../../hooks/useAxiosRenewToken";

// context
import { Store } from "../../context/store";

// redux
import { useAppDispatch } from "../../store/hook";
import { loginRedux } from "../../store/userSlice";

// layouts
import NavbarProtect from "../../layouts/NavbarProtect/NavbarProtect";

const ProtectRoute = () => {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const dispatch = useAppDispatch();

  const [isScopeProfile, setIsScopeProfile] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useCookie("accessToken", null);
  const [refreshToken, setRefreshToken] = useCookie("refreshToken", null);

  // for check authentication
  const [permit, setPermit] = useState<boolean | string>("none");
  const [expireToken, setExpireToken] = useState<boolean>(false);

  useEffect(() => {
    setIsScopeProfile(false);
  }, [location.pathname]);

  useEffect(() => {
    useAxios("/auth/detail-user", "get", false, true)
      .then((result) => {
        console.log(result);
        dispatch(
          loginRedux({
            displayName: result.data.data.displayName,
            username: result.data.data.username,
            email: result.data.data.email,
            urlAvatar: result.data.data.urlAvatar,
            provider: result.data.data.provider,
            ownerParty: result.data.data.ownerParty,
            memberParty: result.data.data.memberParty,
            scoreEntries: result.data.data.scoring.scoreEntries,
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
              const resultRenewToken = await useAxiosRenewToken(
                "/auth/new-token",
                "get",
                false,
                true
              );
              setAccessToken(resultRenewToken.data.accessToken);
              setRefreshToken(resultRenewToken.data.refreshToken);
              window.location.reload();
            } catch (error) {
              setExpireToken(true);
              console.log(error);
            }
          } else {
            navigate("/login");
          }
        } else {
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
