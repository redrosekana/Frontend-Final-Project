interface ButtonProps {
  title: string;
  color: string;
  hover: string;
  shadow: string;
  onClick?(): void;
}

const Button = ({ title, color, hover, shadow, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${color} w-full telephone:w-[130px] py-2 shadow shadow-${shadow} rounded text-white hover:${hover} transition-colors duration-200 ease-in`}
    >
      {title}
    </button>
  );
};

export default Button;
