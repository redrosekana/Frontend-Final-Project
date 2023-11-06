// import library
import { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";

// components
import Footer from "../../../components/Footer";
import ItemListPopular from "./ItemListPopular";

// utils
import { axiosExtra } from "../../../utils/axiosExtra";

interface ItemListPopularBoardgame {
  name: string;
  picture: string;
  year: string;
  id: string;
}

function HomeProtect() {
  const [popularBoardGame, setPopularBoardGame] = useState<
    ItemListPopularBoardgame[]
  >([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axiosExtra("/boardgames/popular", "get", false, false)
      .then((result) => {
        setPopularBoardGame(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main>
      <div className="mt-12 mb-4 max-w-[1400px] mx-auto px-5">
        <div className="flex flex-col specific:flex-row">
          <div className="flex flex-col justify-center order-2 text-center mt-8 w-full specific:w-[55%] specific:order-1 specific:mt-0 specific:text-start">
            <h3 className="font-bold text-2xl telephone:text-4xl lg:text-5xl">
              Board Game RecCommu
            </h3>
            <p className="mt-4 text-xl text-slate-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              esse ab ipsam blanditiis quaerat odit exercitationem
              necessitatibus totam rem omnis tempore vitae quos odio, deserunt
              tempora sunt enim quo! Quibusdam?
            </p>
            <div className="mt-4 flex flex-col telephone:block">
              <button className="bg-orangey p-2 font-medium text-xl rounded-md text-white hover:bg-orange-500 transition-colors duration-150 ease-in">
                <NavLink to="/page/recommend">ระบบแนะนำบอร์ดเกม</NavLink>
              </button>
              <button className="border-2 border-gray-800 p-2 font-medium text-xl rounded-md ml-0 mt-3 telephone:ml-4 telephone:mt-0 hover:bg-slate-100 transition-colors duration-150 ease-in">
                <NavLink to="/page/party">ระบบค้นหาผู้เล่น</NavLink>
              </button>
            </div>
          </div>

          <div className="flex justify-center order-1 w-full specific:justify-end specific:w-[45%] specific:order-2">
            <img
              src="/picture1.jpg"
              alt="picture1"
              className="max-w-[450px] w-full rounded-3xl specific:max-w-[550px] shakeAnimation"
            />
          </div>
        </div>

        <div className="mt-36 lg:mt-[245px]">
          <h3 className="font-bold text-2xl telephone:text-4xl mb-12">
            บอร์ดเกมยอดนิยม
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16">
            {popularBoardGame.map((boardgame, index) => {
              return (
                <ItemListPopular
                  key={index}
                  name={boardgame.name}
                  picture={boardgame.picture}
                  year={boardgame.year}
                  id={boardgame.id}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default HomeProtect;
