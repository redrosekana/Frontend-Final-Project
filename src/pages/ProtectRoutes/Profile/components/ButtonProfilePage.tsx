import { ButtonProps } from "../types/ButtonTypes";

const ButtonProfilePage = ({
  title,
  color,
  hover,
  shadow,
  onClick,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${color} w-full telephone:w-[130px] py-2 shadow shadow-${shadow} rounded text-white hover:${hover} transition-colors duration-200 ease-in`}
    >
      {title}
    </button>
  );
};

export default ButtonProfilePage;
