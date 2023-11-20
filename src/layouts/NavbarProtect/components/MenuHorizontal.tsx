import { NavLink } from "react-router-dom";

// constants
import { LinkThaiContent } from "../../../data/LinkEntries";

interface MenuHorizontalProps {
  path: string;
  index: number;
}

const MenuHorizontal = ({ path, index }: MenuHorizontalProps) => {
  return (
    <NavLink
      to={`/page/${path.toLowerCase()}`}
      className={({ isActive }) =>
        isActive ? "activeclassName" : "notActiveclassName"
      }
    >
      {LinkThaiContent[index]}
    </NavLink>
  );
};

export default MenuHorizontal;
