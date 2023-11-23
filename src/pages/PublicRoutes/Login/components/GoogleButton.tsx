import { GoogleButtonProps } from "../types/GoogleButtonTypes";

const GoogleButton = ({ onLoginGoogle }: GoogleButtonProps) => {
  return (
    <button
      className="relative flex justify-center items-center gap-2 bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full telephone:w-32 mt-2 telephone:mt-0 h-10 px-5 py-2 text-center transition-colors duration-200 ease-in"
      onClick={onLoginGoogle}
      type="button"
    >
      <div className="w-8 h-8 bg-white flex justify-center items-center telephone:absolute telephone:top-1 telephone:left-1 rounded">
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />
      </div>
      <div className="text-white telephone:ml-7">google</div>
    </button>
  );
};

export default GoogleButton;
