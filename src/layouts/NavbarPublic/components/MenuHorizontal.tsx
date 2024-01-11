import { NavLink } from "react-router-dom";

// types
import { MenuHorizontalProps } from "../types/MenuHorizontalTypes";

const MenuHorizontal = ({ path, name }: MenuHorizontalProps) => {
  return (
    <NavLink
      to={`/${path.toLowerCase()}`}
      className={({ isActive }) =>
        isActive ? "activeclassName" : "notActiveclassName"
      }
    >
      {name}
    </NavLink>
  );
};

export default MenuHorizontal;
