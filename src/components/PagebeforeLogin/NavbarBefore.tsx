// import library
import React, { useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

// link ของ navbar
const Link:string[] = ["Home", "About", "Recommend", "Party", "Map"];

function NavbarBefore() {
  const buttonHamberger = useRef<HTMLButtonElement>(null)
	const sideBar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    window.addEventListener("resize",autoDisplaySideBar)
    return () => {
      window.removeEventListener("resize",autoDisplaySideBar)
    }
  })

  // ฟังชันก์เปิดปิด sidebar อัตโนมัต จากการ check event resize
  const autoDisplaySideBar = () => {
    if (window.outerWidth >= 860){
      sideBar.current?.classList.remove("-translate-x-full")
      sideBar.current?.classList.add("-translate-x-full") 
    }
  }
	
  // ฟังชันก์เมื่อมีการคลิ๊กที่ hamberger ให้เปิดปิด sidebar
	const clickButtonHamberger = () => {
		sideBar.current?.classList.toggle("-translate-x-full")
  }

  return (
    <React.Fragment>
      {/* Navbar */}
      <nav className="container max-w-[1400px] h-20 mx-auto w-full px-5">
        <div className="flex justify-between items-center">
          <div className=" flex items-center cursor-pointer">
            <div>
              <img src="/Logo.png" alt="Logo" className="w-24 h-24" />
            </div>
            <span className="font-bold text-2xl -translate-x-4">BGRMU</span>
          </div>
          
          <div className="flex specific:hidden items-center text-3xl">
            <button ref={buttonHamberger} onClick={clickButtonHamberger}>
              <i className="fa-solid fa-bars"></i>
            </button>
          </div>

          <ul className="hidden specific:flex items-center">
            {Link.map((e, i) => {
              return <ItemMenu key={i} path={e} />
            })}
          </ul>

          <div className="hidden specific:flex">
            <a href="/login">
              <button className="mr-2 text-md bg-slate-100 hover:bg-slate-200 focus:ring-1 focus:ring-gray-300 font-medium px-3 py-1.5 rounded-md transition-colors duration-75 ease-in">Login</button>
            </a>
            <NavLink to="/register">
              <button className="ml-1 text-md text-white bg-limegreen  hover:bg-green-500 focus:ring-1 focus:ring-green-300 font-medium px-3 py-1.5 rounded-md transition-colors duration-75 ease-in">
                Sign up
              </button>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* SideBar */}
      <nav className="bg-gray-50 w-64 h-screen fixed top-0 left-0 z-50 -translate-x-full transition-transform duration-300 ease-in-out" ref={sideBar}>
        <div className="text-[2.2rem] mt-2 relative">
          <button className="absolute top-4 right-5" onClick={clickButtonHamberger}>
            <i className="fa-solid fa-xmark w-full" />
          </button>
        </div>

				<div className="flex text-2xl cursor-pointer items-center">
            <div>
              <img src="/Logo.png" alt="Logo" className="w-20 h-20" />
            </div>
            <span className="font-bold text-xl -translate-x-4">BGRMU</span>
        </div>

        <ul className="flex flex-col items-center px-3 mt-10">
          {Link.map((e, i) => {
            return <ItemSideBar key={i} path={e} index={i} />
          })}
        </ul>

        <div className="flex flex-col items-center mt-10">
          <a href="/login" className="text-md flex justify-center bg-slate-200 hover:bg-slate-300 font-medium px-3 py-1.5 rounded-md w-40 transition-colors duration-200 ease-in">
            Login
          </a>
          <button className="mt-2 text-md text-white bg-limegreen hover:bg-green-500 font-medium px-3 py-1.5 rounded-md w-40 transition-colors duration-200 ease-in">
            <NavLink to="/register">Sign up</NavLink>
          </button>
        </div>
      </nav>
    </React.Fragment>
  );
}

// declare interface ItemMenu
interface ItemMenuProps {
  path:string,
}

const ItemMenu = ({ path }:ItemMenuProps) => {
  return (
    <NavLink to={`/${path.toLowerCase()}`}
      className={({ isActive }) => isActive ? "activeclassName" : "notActiveclassName"}
    >{path}
    </NavLink>
  )
}

// declare interface ItemSideBar
interface ItemSideBarProps extends ItemMenuProps {
  index:number
} 

const ItemSideBar = ({ path , index }:ItemSideBarProps) => {
  const Icon: string[] = ["fa-house", "fa-address-card", "fa-comment", "fa-user-group", "fa-map"]
  
  return (
    <li className="w-full text-xl my-2 text-gray-700 font-medium rounded-lg px-1 py-1.5 hover:bg-gray-100 duration-100 transition-colors">
      <NavLink to={`/${path.toLowerCase()}`} className="flex items-center ml-4 w-full h-full">
        <i className={`fa-solid ${Icon[index]} mr-4`}></i>{path}
      </NavLink>
    </li>
  )
}

export default NavbarBefore
