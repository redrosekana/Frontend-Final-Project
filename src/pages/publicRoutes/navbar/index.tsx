// import library
import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, NavigateFunction } from "react-router-dom";

// constants
import { LinkEngContent } from "../../../constants/LinkEntries";

// component
import MenuHorizontal from "./MenuHorizontal";
import MenuVertical from "./MenuVertical";

function NavbarPublic() {
  const buttonHamberger = useRef<HTMLButtonElement>(null);
  const sideBar = useRef<HTMLDivElement>(null);

  const navigate: NavigateFunction = useNavigate();

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
      <nav className="container max-w-[1400px] h-20 mx-auto w-full px-5">
        <div className="flex justify-between items-center">
          <div
            className="flex items-center cursor-pointer -translate-x-6"
            onClick={() => navigate("/home")}
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

          <div className="hidden specific:flex">
            <a href="/login">
              <button className="mr-2 text-md bg-slate-100 hover:bg-slate-200 focus:ring-1 focus:ring-gray-300 font-medium px-3 py-1.5 rounded-md transition-colors duration-75 ease-in">
                เข้าสู่ระบบ
              </button>
            </a>
            <NavLink to="/register">
              <button className="ml-1 text-md text-white bg-limegreen  hover:bg-green-500 focus:ring-1 focus:ring-green-300 font-medium px-3 py-1.5 rounded-md transition-colors duration-75 ease-in">
                สมัครสมาชิก
              </button>
            </NavLink>
          </div>
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
          {LinkEngContent.map((link, index) => {
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
          <a
            href="/login"
            className="text-md flex justify-center bg-slate-200 hover:bg-slate-300 font-medium px-3 py-1.5 rounded-md w-40 transition-colors duration-200 ease-in"
          >
            เข้าสู่ระบบ
          </a>
          <button className="mt-2 text-md text-white bg-limegreen hover:bg-green-500 font-medium px-3 py-1.5 rounded-md w-40 transition-colors duration-200 ease-in">
            <NavLink to="/register">สมัครสมาชิก</NavLink>
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default NavbarPublic;
