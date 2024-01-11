import { ButtonProps } from "../types/ButtonTypes";

const ButtonProfilePage = ({ title, color, hover, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${color} w-full tl:w-[130px] py-2 rounded-md text-white hover:${hover} transition duration-150 ease-in`}
    >
      {title}
    </button>
  );
};

export default ButtonProfilePage;
