// types
import { SearchBoardgameRecommendInputProps } from "../types/SearchBoardgameRecommendInputTypes";

function SearchBoardgameRecommendInput({
  type,
  placeholder,
  register,
  required,
}: SearchBoardgameRecommendInputProps) {
  return (
    <>
      <div className="relative w-full h-12">
        <div className="absolute flex inset-y-0 left-3 items-center">
          <i className="fa-solid fa-magnifying-glass text-gray-600"></i>
        </div>
        <input
          type={type}
          className="w-full h-12 rounded-md text-lg pl-10 text-gray-700 outline-none bg-slate-50 border-slate-300 focus:border-blue-500 focus:ring-1"
          placeholder={placeholder}
          {...register("search", { required })}
        />
      </div>

      <button
        type="submit"
        className="px-4 h-12 text-lg font-medium text-white bg-primary rounded-lg focus:ring-2 ring-green-300 focus:outline-none"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </>
  );
}

export default SearchBoardgameRecommendInput;
