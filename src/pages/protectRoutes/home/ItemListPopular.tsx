interface ItemListPopularProps {
  name: string;
  picture: string;
  year: string;
  id: string;
  index: number;
}

const ItemListPopular = ({
  name,
  picture,
  year,
  id,
  index,
}: ItemListPopularProps) => {
  const { VITE_WEBBORADGAME } = import.meta.env;
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-[270px] w-full h-[250px] rounded-xl">
        <a href={`${VITE_WEBBORADGAME}/${id}`} target="_blank">
          <img
            src={picture}
            alt={`picture${index + 1}`}
            className="w-full h-full rounded-xl object-fill cursor-pointer hover:scale-[1.03] transition-transform ease-in duration-75"
          />
        </a>
      </div>
      <div className="max-w-[260px] w-full mt-5">
        {index === 0 || index === 1 || index === 2 ? (
          <div className="w-[65px] h-[25px] inline-block rounded-full bg-orange-500 shadow shadow-orange-800 text-white mb-4 text-center flashingAnimation">
            มาแรง {index + 1}
          </div>
        ) : null}
        <h4 className="text-2xl font-semibold">
          {index + 1}. {name}
        </h4>
        <p className="text-xl font-normal text-gray-400 mt-1">{year}</p>
      </div>
    </div>
  );
};

export default ItemListPopular;
