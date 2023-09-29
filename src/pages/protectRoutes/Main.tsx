import { useState, useEffect } from "react";
import { axiosExtra } from "../../utils/axiosExtra";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import Cookies from "universal-cookie";

// interface
import { ErrorResponse } from "../../interfaces/axios.interface";

import { axiosRenewToken } from "../../utils/axiosRenewToken";

// context
import { Store } from "../../context/store";

import NavbarProtect from "./navbar";

const MainProtect = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [provider, setProvider] = useState<string>("");

  // for check authentication
  const [permit, setPermit] = useState<boolean | string>("none");
  const [expireToken, setExpireToken] = useState<boolean>(false);

  useEffect(() => {
    axiosExtra("/auth/detail-user", "get", false, true)
      .then((result) => {
        setDisplayName(result.data.data.displayName);
        setEmail(result.data.data.email);
        setProvider(result.data.data.provider);
        setUsername(result.data.data.username);
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
      <Store.Provider value={{ displayName, email, username, provider }}>
        <NavbarProtect />
        <Outlet />
      </Store.Provider>
    );
  }
};

export default MainProtect;
