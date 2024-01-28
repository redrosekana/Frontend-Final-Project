import React, { useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

// components
import ScopeProfile from "../../pages/ProtectRoutes/Profile/components/scopeProfile";
import MenuHorizontal from "./components/MenuHorizontal";
import MenuVertical from "./components/MenuVertical";

// assets
import Logo from "../../assets/logo.png";

// data
import {
  LinkEngContentPrivate,
  LinkThaiContentPrivate,
  LinkIconPrivate,
} from "../../data/LinkEntries";

// utils
import { createSwal } from "../../utils/createSwal";

// redux
import { useAppDispatch, useAppSelector } from "../../store/hook";
import type { RootState } from "../../store/store";
import { logoutRedux } from "../../store/userSlice";
import { resetProperty } from "../../store/recommendPayloadSlice";

// context
import { Store } from "../../context/store";

function NavbarProtect() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state: RootState) => state.users);
  const context = useContext(Store);
  const cookies = new Cookies();

  const buttonHamberger = useRef<HTMLButtonElement>(null);
  const sideBar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("resize", autoDisplaySideBar);
    return () => {
      window.removeEventListener("resize", autoDisplaySideBar);
    };
  }, []);

  // ฟังชันก์เปิดปิด sidebar อัตโนมัติ จากการ check event resize
  const autoDisplaySideBar = () => {
    if (window.outerWidth >= 860) {
      sideBar.current?.classList.add("-translate-x-full");
    } else {
      context?.setIsScopeProfile(false);
    }
  };

  // ฟังชันก์เมื่อมีการคลิ๊กที่ hamberger ให้เปิดปิด sidebar
  const clickButtonHamberger = () => {
    sideBar.current?.classList.toggle("-translate-x-full");
  };

  // ฟังชันก์สำหรับหน้าจอขนาดเล็ก กดแล้วปิด sidebar อัตโนมัติ
  const autoDisplaySideBarClickButton = () => {
    sideBar.current?.classList.add("-translate-x-full");
  };

  const LogoutButton = () => {
    createSwal(
      "คุณต้องการออกจากระบบใช่ไหม",
      "ยืนยันการออกจากระบบ",
      "question",
      "#0083e1",
      true
    ).then((value: any) => {
      if (value.isConfirmed) {
        cookies.remove("accessToken");
        cookies.remove("refreshToken");
        dispatch(logoutRedux());
        dispatch(resetProperty());
        navigate("/");
      }
    });
  };

  return (
    <React.Fragment>
      <nav className="container max-w-[1450px] h-20 mx-auto w-full flex justify-between pr-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/page/home")}
        >
          <div>
            <img src={Logo} alt="Logo" className="w-20 h-20" />
          </div>
          <span className="font-bold text-2xl -translate-x-4">BGRC</span>
        </div>

        <div className="flex lg:hidden items-center text-3xl">
          <button ref={buttonHamberger} onClick={clickButtonHamberger}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <ul className="hidden lg:flex justify-center items-center lg:gap-x-6 xl:gap-x-14 flex-grow">
          {LinkEngContentPrivate.map((link: string, index: number) => {
            return (
              <MenuHorizontal
                key={index}
                path={link}
                name={LinkThaiContentPrivate[index]}
              />
            );
          })}
        </ul>

        <div className="hidden lg:flex lg:items-center">
          <div className="text-xl mr-2">{selector.displayName}</div>
          <div className="w-[50px] cursor-pointer relative">
            <img
              src={selector.urlAvatar}
              alt="avatar"
              className="w-full object-cover"
              onClick={() => context?.setIsScopeProfile((prev) => !prev)}
            />
            {context?.isScopeProfile ? (
              <ScopeProfile LogoutButton={LogoutButton} />
            ) : null}
          </div>
        </div>
      </nav>

      {/* SideBar */}
      <div
        className="bg-gray-50 w-64 h-screen fixed top-0 left-0 z-50 -translate-x-full transition-transform duration-200 ease-in"
        ref={sideBar}
      >
        <div className="text-[2.2rem] mt-2 relative">
          <button
            className="absolute top-4 right-5"
            onClick={clickButtonHamberger}
          >
            <i className="fa-solid fa-xmark w-full" />
          </button>
        </div>

        <div className="flex text-2xl cursor-pointer items-center">
          <div>
            <img src={Logo} alt="Logo" className="w-20 h-20" />
          </div>
          <span className="font-bold text-xl -translate-x-4">BGRC</span>
        </div>

        <ul className="flex flex-col items-center px-3 mt-10">
          {LinkEngContentPrivate.map((link: string, index: number) => {
            return (
              <MenuVertical
                key={index}
                path={link}
                name={LinkThaiContentPrivate[index]}
                icon={LinkIconPrivate[index]}
                onclick={autoDisplaySideBarClickButton}
              />
            );
          })}
        </ul>

        <div className="flex flex-col items-center mt-10">
          <NavLink to="/page/profile">
            <button className="text-md bg-limegreen hover:bg-green-500 font-medium px-3 py-1.5 rounded-md text-white w-40 transition-colors duration-200 ease-in">
              โปรไฟล์ผู้ใช้งาน
            </button>
          </NavLink>

          <button
            onClick={LogoutButton}
            className="mt-3 text-md bg-slate-200 hover:bg-slate-300 font-medium px-3 py-1.5 rounded-md w-40 transition-colors duration-200 ease-in"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NavbarProtect;
