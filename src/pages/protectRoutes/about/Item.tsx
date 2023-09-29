interface ItemProps {
  order: number;
  img: string;
  title: string;
  content: string;
}

const Item = ({ order, img, title, content }: ItemProps) => {
  return (
    <div className="flex flex-col md:flex-row mb-20 md:mb-32 lg:mb-48">
      <div
        className={`flex justify-center ${
          order % 2 === 0 ? "md:order-1" : "md:order-2"
        }`}
      >
        <img
          src={img}
          alt="about1"
          className="w-[350px] md:w-[500px] lg:w-[650px] xl:w-[800] rounded-2xl "
        />
      </div>
      <div
        className={`w-full ${order % 2 === 0 ? "md:order-2" : "md:order-1"}`}
      >
        <h3
          className={`mt-6 ml-4 md:mt-0 ${
            order % 2 === 0 ? "md:ml-4 lg:ml-10" : "md:mr-4 lg:mr-10"
          }  font-bold text-2xl md:text-2xl lg:text-3xl xl:text-5xl`}
        >
          {title}
        </h3>
        <p
          className={`mt-3 ml-6 md:mt-4 lg:mt-6 ${
            order % 2 === 0 ? "md:ml-6 lg:ml-12" : "md:mr-6 lg:mr-12"
          } text-gray-500 text-lg md:text-lg lg:text-xl xl:text-2xl leading-relaxed xl:leading-relaxed`}
        >
          {content}
        </p>
      </div>
    </div>
  );
};

export default Item;
