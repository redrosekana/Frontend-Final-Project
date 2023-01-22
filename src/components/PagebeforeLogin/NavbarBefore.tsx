//* import library
import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";


function NavbarBefore() {
  const Link:string[] = ["Home", "About", "Recommend", "Party", "Map"];

  const buttonHamberger = useRef<HTMLButtonElement>(null)
	const sideBar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.addEventListener("resize",autoDisplaySideBar)
    return () => {
      window.removeEventListener("resize",autoDisplaySideBar)
    }
  })

  const autoDisplaySideBar = () => {
    if (window.outerWidth >= 860){
      sideBar.current?.classList.remove("-translate-x-full")
      sideBar.current?.classList.add("-translate-x-full") 
    }
  }
	
	const clickButtonHamberger = () => {
		sideBar.current?.classList.toggle("-translate-x-full")
  }

  return (
    <React.Fragment>
      <nav className="container max-w-[1400px] mx-auto w-full py-4 px-5">
        <div className="flex justify-between">
          <div className="flex text-2xl cursor-pointer items-center">
            <div className="font-bold">Boad Game</div>
          </div>

          <div className="flex specific:hidden items-center text-3xl">
            <button ref={buttonHamberger} onClick={clickButtonHamberger}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

          <ul className="hidden specific:flex items-center">
            {Link.map((e, i) => {
              return ItemMenu(e,i)
            })}
          </ul>

          <div className="hidden specific:flex">
            <NavLink to="/login">
              <button className="mr-2 text-md bg-slate-100 hover:bg-slate-300 font-medium px-3 py-1.5 rounded-md">
                Login
              </button>
            </NavLink>
            <NavLink to="/register">
              <button className="ml-1 text-md bg-limegreen hover:bg-green-600 font-medium px-3 py-1.5 rounded-md text-white">
                Sign up
              </button>
            </NavLink>
          </div>
        </div>
      </nav>
      
      {/* SideBar */}
      <div className="bg-gray-50 w-64 h-screen fixed top-0 left-0 z-50 -translate-x-full transition-transform duration-200 ease-in" ref={sideBar}>
        <div className="text-[2.2rem] mt-2 relative">
          <button className="absolute top-2 right-4" onClick={clickButtonHamberger}>
            <i className="fa-solid fa-xmark w-full" />
          </button>
        </div>

				<div className="flex text-2xl cursor-pointer items-center mt-6">
            <div className="font-bold ml-6">Boad Game</div>
          </div>

        <ul className="flex flex-col items-center px-3 mt-10">
          {Link.map((e, i) => {
            return SideBar(e,i)
          })}
        </ul>

        <div className="flex flex-col items-center mt-10">
          <NavLink to="/login">
            <button className="text-md bg-slate-200 hover:bg-slate-300 font-medium px-3 py-1.5 rounded-md w-40">
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="mt-2 text-md bg-limegreen hover:bg-green-600 font-medium px-3 py-1.5 rounded-md text-white w-40">
              Sign up
            </button>
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
}

const ItemMenu = (path:string, index:number) => {
  return (
    <React.Fragment key={index}>
      <NavLink
        to={`/main/${path.toLowerCase()}`}
        className={({ isActive }) => isActive ? "activeclassName" : "notActiveclassName"}
      >
        {path}
      </NavLink>
    </React.Fragment>
  );
};

const SideBar = (path:string, index:number) => {
  const Icon: string[] = ["fa-house", "fa-address-card", "fa-comment", "fa-user-group", "fa-map"]
  
  return (
    <React.Fragment key={index}>
      <li className="w-full text-xl my-2 text-gray-700 font-medium rounded-lg px-1 py-1.5 hover:bg-gray-100 duration-100 transition-colors">
        <button className="flex items-center ml-4 w-full h-full">
          <i className={`fa-solid ${Icon[index]}`}></i>
          <NavLink
            key={index}
            to={`/main/${path.toLowerCase()}`}
            className="ml-3"
          >
            {path}
          </NavLink>
        </button>
      </li>
    </React.Fragment>
    
  );
};

export default NavbarBefore
