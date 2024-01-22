// types
import { GoogleButtonProps } from "../types/GoogleButtonTypes";

const GoogleButton = ({ onLoginGoogle }: GoogleButtonProps) => {
  return (
    <button
      className="py-1 tl:py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-md w-full tl:w-32 transition ease-in duration-150 relative flex justify-center items-center gap-x-2"
      onClick={onLoginGoogle}
      type="button"
    >
      <div className="w-8 h-8 bg-white flex justify-center items-center tl:absolute tl:top-1 tl:left-1 rounded">
        <img className="google-icon" src="/google-icons.png" />
      </div>
      <div className="text-white tl:ml-7">Google</div>
    </button>
  );
};

export default GoogleButton;
