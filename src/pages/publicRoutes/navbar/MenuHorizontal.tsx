import { NavLink } from "react-router-dom";

// constants
import { LinkThaiContent } from "../../../constants/LinkEntries";

interface MenuHorizontalProps {
  path: string;
  index: number;
}

const MenuHorizontal = ({ path, index }: MenuHorizontalProps) => {
  return (
    <NavLink
      to={`/${path.toLowerCase()}`}
      className={({ isActive }) =>
        isActive ? "activeclassName" : "notActiveclassName"
      }
    >
      {LinkThaiContent[index]}
    </NavLink>
  );
};

export default MenuHorizontal;
