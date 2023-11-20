import { ItemBoardgameRecommendProps } from "../types/ItemBoardgameRecommendTypes";

const ItemBoardgameRecommend = ({
  id,
  name,
  minplayers,
  maxplayers,
  minage,
  playingtime,
  yearpublished,
  description,
  image,
  index,
}: ItemBoardgameRecommendProps) => {
  const { VITE_WEBBORADGAME } = import.meta.env;

  let descriptionOptimize = description.slice(0, 250);
  let orderBackspace = descriptionOptimize.lastIndexOf(" ");
  descriptionOptimize = descriptionOptimize.slice(0, orderBackspace);
  descriptionOptimize = descriptionOptimize.replace(/\&.*\;/gi, "");

  return (
    <div className="p-6 flex flex-col items-center md:flex-row md:items-start mb-4">
      <div className="max-w-[270px] w-full h-[250px] rounded-2xl md:self-center md:h-[300px]">
        <img
          src={image}
          alt="image"
          className="w-full h-full object-fill rounded-2xl md:h-full"
        />
      </div>

      <div className="max-w-[400px] w-full mt-6 md:mt-2 md:ml-8 md:max-w-max">
        <p className="font-semibold text-3xl">
          {index !== undefined ? index + 1 + ")." : null} {name}
        </p>
        <p className="mt-1 font-normal text-xl text-gray-500">
          {yearpublished}
        </p>
        <p className="mt-4 text-xl">
          <span className="font-semibold">รายละเอียด</span>{" "}
          {descriptionOptimize}{" "}
          <a
            className="text-blue-700 underline ml-1"
            href={`${VITE_WEBBORADGAME}/${id}`}
            target="_blank"
          >
            อ่านต่อ
          </a>
        </p>

        <div className=" flex justify-center md:justify-start mt-4 gap-x-4">
          <div className="text-lg  flex flex-col items-center px-2">
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
                : `${minplayers}-${maxplayers}`}{" "}
              คน
            </span>
          </div>
          <div className="text-lg  flex flex-col items-center px-2">
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
          <div className="text-lg  flex flex-col items-center px-2">
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
        </div>
      </div>
    </div>
  );
};

export default ItemBoardgameRecommend;
