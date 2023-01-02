import { NavLink } from "react-router-dom";
import "../App.css"

export default function Navbar() {
  const Link: string[] = ["Home","About","Recommend","Party","Map","Agreement",];

  return (
    <nav className="container max-w-6xl mx-auto w-full p-3">
      <div className="flex justify-between">
        <div className="flex text-xl cursor-pointer items-center">
          <div className="font-bold">Boad Game</div>
        </div>

        <ul className="flex items-center">
          {Link.map((e,i) => {
            return itemMenu(e,i);
          })}
        </ul>

        <div className="flex">
          <NavLink to="/login">
            <button className="mr-2 text-base bg-slate-100 font-medium px-3 py-1 rounded-md">
              Login
            </button>
          </NavLink>
          <NavLink to="/register">
            <button className="ml-1 text-base bg-limegreen font-medium px-2 py-1 rounded-md text-white">
              Sign up
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

const itemMenu = (path: string , index:number) => {
  return (
    <NavLink
      key={index}
      to={`/page/${path.toLowerCase()}`}
      className={({isActive}) => isActive ? "activeclassName" : "notActiveclassName"}
    >
      {path}
    </NavLink>
  );
};


