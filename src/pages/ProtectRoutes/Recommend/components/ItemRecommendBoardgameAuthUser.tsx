// types
import { ItemRecommendBoardgameAuthUserProps } from "../types/ItemRecommendBoardgameAuthUserTypes";

// utils
import { VITE_WEBBORADGAME } from "../../../../utils/getEnv";

const ItemRecommendBoardgameAuthUser = ({
  id,
  name,
  minplayers,
  maxplayers,
  minage,
  playingtime,
  yearpublished,
  description,
  image,
  weight,
  index,
  scoreEntries,
  setOpenPostScoreModel,
  setBoardgameName,
}: ItemRecommendBoardgameAuthUserProps) => {
  const customizeDescription = (description: string) => {
    let descriptionOptimize = description.slice(0, 250);
    let orderBackspace = descriptionOptimize.lastIndexOf(" ");
    descriptionOptimize = descriptionOptimize.slice(0, orderBackspace);

    return (descriptionOptimize = descriptionOptimize.replace(
      /&#10;|&quot;|&rdquo;|&ldquo;|&mdash;|&#9;|&rsquo;/gi,
      " "
    ));
  };

  const customizeWeight = (weight: number) => {
    if (weight <= 1.8) {
      return ["/icons/circle-E.svg", "ง่าย"];
    } else if (weight > 1.8 && weight <= 2.8) {
      return ["/icons/circle-M.svg", "ปานกลาง"];
    } else {
      return ["/icons/circle-H.svg", "ยาก"];
    }
  };

  const actionOpenModal = (name: string) => {
    setOpenPostScoreModel(true);
    setBoardgameName(name);
  };

  const disableButtonGiveSocre = (name: string) => {
    const action = scoreEntries.find((entrie) => entrie.name === name);
    return action ? true : false;
  };

  return (
    <div className="flex flex-col items-center lg:flex-row lg:items-start mb-4 gap-x-6 p-6">
      <div className="max-w-[270px] w-full h-[300px]">
        <img
          src={image}
          alt="image"
          className="w-full h-full object-fill rounded-xl"
        />
      </div>

      <div className="max-w-[800px] w-full mt-4 lg:mt-0">
        <p className="font-semibold text-3xl">
          {index + 1}). {name}
        </p>
        <p className="mt-1 font-normal text-xl text-gray-500">
          {yearpublished}
        </p>
        <p className="mt-4 text-xl">
          <span className="font-semibold">รายละเอียด</span>{" "}
          {customizeDescription(description)}{" "}
          <a
            className="text-blue-700 underline ml-1"
            href={`${VITE_WEBBORADGAME}/${id}`}
            target="_blank"
          >
            อ่านต่อ
          </a>
        </p>

        <div className="flex justify-center md:justify-start mt-4 gap-x-4">
          <div className="text-lg flex flex-col items-center px-2">
            <img
              src="/icons/person.png"
              alt="person"
              className="max-w-[60px] w-full h-[60px] "
            />
            <span className="text-center mt-1">
              {" "}
              <span className="font-semibold">จำนวนผู้เล่น</span>{" "}
              {minplayers === maxplayers
                ? minplayers
                : `${minplayers} - ${maxplayers}`}{" "}
              คน
            </span>
          </div>
          <div className="text-lg flex flex-col items-center px-2">
            <img
              src="/icons/time.png"
              alt="time"
              className="max-w-[60px] w-full h-[60px] "
            />
            <span className="text-center mt-1">
              <span className="font-semibold">เวลาในการเล่น</span> {playingtime}{" "}
              นาที
            </span>
          </div>
          <div className="text-lg flex flex-col items-center px-2">
            <img
              src="/icons/age.png"
              alt="time"
              className="max-w-[60px] w-full h-[60px] "
            />
            <span className="text-center mt-1">
              <span className="font-semibold">อายุ</span> {minage}{" "}
              <span className="font-semibold">ปีขึ้นไป</span>
            </span>
          </div>
          <div className="text-lg flex flex-col items-center px-2">
            <img
              src={customizeWeight(weight)[0]}
              alt="time"
              className="max-w-[60px] w-full h-[60px] "
            />
            <span className="text-center mt-1">
              <span className="font-semibold">
                ระดับ {customizeWeight(weight)[1]}
              </span>{" "}
              ({weight.toFixed(2)}){" "}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-grow mt-4 w-full lg:mt-0 lg:w-auto flex justify-center xl:justify-end">
        <button
          onClick={() => actionOpenModal(name)}
          disabled={disableButtonGiveSocre(name)}
          className={`${
            disableButtonGiveSocre(name)
              ? "bg-gray-400"
              : "bg-thrith hover:bg-orange-500"
          } py-2 text-white rounded-md w-28 text-md transition ease-in duration-150`}
        >
          ให้คะแนน
        </button>
      </div>
    </div>
  );
};

export default ItemRecommendBoardgameAuthUser;
