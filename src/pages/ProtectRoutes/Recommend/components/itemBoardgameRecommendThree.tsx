// types
import { ItemBoardgameRecommendThreeProps } from "../types/ItemBoardgameRecommendThreeTypes";

// utils
import { VITE_WEBBORADGAME } from "../../../../utils/getEnv";

const ItemBoardgameRecommendThree = ({
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
}: ItemBoardgameRecommendThreeProps) => {
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
    <div className="p-6 flex flex-col items-center lg:flex-row lg:items-start mb-4 gap-x-6">
      <div className="max-w-[250px] w-full h-[300px]">
        <img
          src={image}
          alt="image"
          className="w-full h-full object-fill rounded-xl"
        />
      </div>

      <div className="max-w-[800px] w-full mt-4 lg:mt-0">
        <p className="font-semibold text-3xl">
          {index + 1}. {name}
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
              src="/person.png"
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
              src="/time.png"
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
              src="/age.png"
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

      <div className="flex-grow flex mt-4 w-full lg:mt-0 lg:w-auto justify-center xl:justify-end">
        <button
          onClick={() => actionOpenModal(name)}
          disabled={disableButtonGiveSocre(name)}
          className={`w-28 text-white ${
            disableButtonGiveSocre(name)
              ? "bg-gray-400"
              : "bg-orangey hover:bg-orange-400"
          } focus:ring-2 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-md px-3 py-2 text-center transition-colors duration-200 ease-in`}
        >
          ให้คะแนน
        </button>
      </div>
    </div>
  );
};

export default ItemBoardgameRecommendThree;
