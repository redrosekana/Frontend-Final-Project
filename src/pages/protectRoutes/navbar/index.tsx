// import library
import React, { useRef, useEffect, useState, useContext } from "react";
import { NavLink, useNavigate, NavigateFunction } from "react-router-dom";
import Cookies from "universal-cookie";

// import components
import ScopeProfile from "../profile/scopeProfile";
import MenuHorizontal from "./MenuHorizontal";
import MenuVertical from "./MenuVertical";

// constants
import { LinkEngContent } from "../../../constants/LinkEntries";

// assets
import avatar from "../../../assets/avatar.svg";

// utils
import { createSwal } from "../../../utils/createSwal";

// context
import { Store } from "../../../context/store";

function NavbarProtect() {
  const navigate: NavigateFunction = useNavigate();
  const cookie = new Cookies();

  const context = useContext(Store);

  const buttonHamberger = useRef<HTMLButtonElement>(null);
  const sideBar = useRef<HTMLDivElement>(null);

  const [profile, SetProfile] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("resize", autoDisplaySideBar);
    return () => {
      window.removeEventListener("resize", autoDisplaySideBar);
    };
  }, []);

  // ฟังชันก์เปิดปิด sidebar อัตโนมัต จากการ check event resize
  const autoDisplaySideBar = () => {
    if (window.outerWidth >= 860) {
      sideBar.current?.classList.remove("-translate-x-full");
      sideBar.current?.classList.add("-translate-x-full");
    } else {
      SetProfile(false);
    }
  };

  // ฟังชันก์เมื่อมีการคลิ๊กที่ hamberger ให้เปิดปิด sidebar
  const clickButtonHamberger = () => {
    sideBar.current?.classList.toggle("-translate-x-full");
  };

  // ฟังชันก์สำหรับหน้าจอขนาดเล็ก กดแล้วปิด sidebar อัตโนมัต
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
        cookie.remove("accessToken");
        cookie.remove("refreshToken");
        navigate("/");
      }
    });
  };

  return (
    <React.Fragment>
      {profile ? <ScopeProfile LogoutButton={LogoutButton} /> : null}
      <nav className="container max-w-[1400px] h-20 mx-auto w-full px-5">
        <div className="flex justify-between">
          <div
            className=" flex items-center cursor-pointer -translate-x-6"
            onClick={() => navigate("/page/home")}
          >
            <div>
              <img src="/Logo.png" alt="Logo" className="w-24 h-24" />
            </div>
            <span className="font-bold text-2xl -translate-x-4">BGRC</span>
          </div>

          <div className="flex specific:hidden items-center text-3xl">
            <button ref={buttonHamberger} onClick={clickButtonHamberger}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

          <ul className="hidden specific:flex items-center">
            {LinkEngContent.map((link: string, index: number) => {
              return <MenuHorizontal key={index} path={link} index={index} />;
            })}
          </ul>

          <div className="hidden specific:flex specific:items-center">
            <div className="text-xl mr-1">{context?.displayName}</div>
            <div className="w-[50px] cursor-pointer">
              <img
                src={avatar}
                alt="avatar"
                className="w-full object-cover"
                onClick={() => SetProfile((prev) => !prev)}
              />
            </div>
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
            <img src="/Logo.png" alt="Logo" className="w-20 h-20" />
          </div>
          <span className="font-bold text-xl -translate-x-4">BGRC</span>
        </div>

        <ul className="flex flex-col items-center px-3 mt-10">
          {LinkEngContent.map((link: string, index: number) => {
            return (
              <MenuVertical
                key={index}
                path={link}
                index={index}
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
