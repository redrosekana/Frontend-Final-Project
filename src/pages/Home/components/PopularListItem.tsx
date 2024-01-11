// types
import { PopularListItemProps } from "../types/PopularListItemTypes";

// utils
import { VITE_WEBBORADGAME } from "../../../utils/getEnv";

const PopularListItem = ({
  id,
  name,
  picture,
  year,
  sequence,
}: PopularListItemProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[250px] w-full h-[250px] rounded-lg">
        <a href={`${VITE_WEBBORADGAME}/${id}`} target="_blank">
          <img
            src={picture}
            alt={`picture${sequence + 1}`}
            className="w-full h-full rounded-lg object-fill cursor-pointer hover:scale-105 transition ease-in duration-100"
          />
        </a>
      </div>
      <div className="max-w-[250px] w-full md:max-w-[300px] mt-5">
        {sequence === 0 || sequence === 1 || sequence === 2 ? (
          <div className="w-[65px] h-[25px] rounded-md bg-thrith shadow shadow-orange-700 text-white mb-4 text-center flashingAnimation">
            มาแรง {sequence + 1}
          </div>
        ) : null}
        <h4 className="text-2xl font-semibold">
          {sequence + 1}. {name}
        </h4>
        <p className="text-xl font-normal text-gray-400 mt-1">{year}</p>
      </div>
    </div>
  );
};

export default PopularListItem;
