import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// data
import {
  LinkEngContentPublic,
  LinkThaiContentPublic,
  LinkIconPublic,
} from "../../data/LinkEntries";

// component
import MenuHorizontal from "./components/MenuHorizontal";
import MenuVertical from "./components/MenuVertical";

function NavbarPublic() {
  const buttonHamberger = useRef<HTMLButtonElement>(null);
  const sideBar = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("resize", autoDisplaySideBar);
    return () => {
      window.removeEventListener("resize", autoDisplaySideBar);
    };
  });

  // ฟังชันก์เปิดปิด sidebar อัตโนมัต จากการ check event resize
  const autoDisplaySideBar = () => {
    if (window.outerWidth >= 860) {
      sideBar.current?.classList.remove("-translate-x-full");
      sideBar.current?.classList.add("-translate-x-full");
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

  return (
    <React.Fragment>
      {/* Navbar */}
      <nav className="max-w-[1450px] h-20 mx-auto w-full flex justify-between pr-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img src="/Logo.png" alt="Logo" className="w-20 h-20" />
          <span className="font-bold text-2xl">BGRC</span>
        </div>

        <div className="flex lg:hidden items-center text-3xl">
          <button ref={buttonHamberger} onClick={clickButtonHamberger}>
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <ul className="hidden lg:flex justify-center items-center gap-x-14 flex-grow">
          {LinkEngContentPublic.map((link: string, index: number) => {
            return (
              <MenuHorizontal
                key={index}
                path={link}
                name={LinkThaiContentPublic[index]}
              />
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center">
          <NavLink to="/login">
            <button className="mr-2 text-md bg-slate-100 hover:bg-slate-200 focus:ring-1 focus:ring-gray-300 font-medium px-3 py-1.5 rounded-md transition-colors duration-75 ease-in">
              เข้าสู่ระบบ
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="ml-1 text-md text-white bg-limegreen  hover:bg-green-500 focus:ring-1 focus:ring-green-300 font-medium px-3 py-1.5 rounded-md transition-colors duration-75 ease-in">
              สมัครสมาชิก
            </button>
          </NavLink>
        </div>
      </nav>

      {/* SideBar */}
      <nav
        className="bg-gray-50 w-64 h-screen fixed top-0 left-0 z-50 -translate-x-full transition-transform duration-300 ease-in-out"
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
          {LinkEngContentPublic.map((link, index) => {
            return (
              <MenuVertical
                key={index}
                path={link}
                name={LinkThaiContentPublic[index]}
                icon={LinkIconPublic[index]}
                onclick={autoDisplaySideBarClickButton}
              />
            );
          })}
        </ul>

        <div className="flex flex-col items-center mt-10">
          <a
            href="/login"
            className="text-md flex justify-center bg-slate-200 hover:bg-slate-300 font-medium px-3 py-1.5 rounded-md w-40 transition duration-150 ease-in"
          >
            เข้าสู่ระบบ
          </a>
          <button className="mt-2 text-md text-white bg-primary hover:bg-green-500 font-medium px-3 py-1.5 rounded-md w-40 transition duration-150 ease-in">
            <NavLink to="/register">สมัครสมาชิก</NavLink>
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavbarPublic;
