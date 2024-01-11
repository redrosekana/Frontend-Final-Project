import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Cookies from "universal-cookie";

// global components
import Footer from "../../components/Footer";

// components
import PopularListItem from "./components/PopularListItem";

// types
import { PopularListItemTypes } from "./types/HomeTypes";

// hooks
import useAxios from "../../hooks/useAxios";

function Home() {
  const cookies = new Cookies();

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [popularListItem, setPopularListItem] = useState<
    PopularListItemTypes[]
  >([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (cookies.get("accessToken") && cookies.get("refreshToken")) {
      setIsLogin(true);
    }

    useAxios("/boardgames/popular", "get", false, false)
      .then((result) => setPopularListItem(result.data.data))
      .catch((error) => console.log(error));

    return () => {};
  }, []);

  return (
    <React.Fragment>
      <main className="mt-12 mb-4 max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h3 className="text-5xl font-bold text-center lg:text-start mt-4 lg:mt-0">
              Board Game RecCommu
            </h3>
            <p className="mt-4 text-xl text-gray-500 text-center lg:text-start">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
              esse ab ipsam blanditiis quaerat odit exercitationem
              necessitatibus totam rem omnis tempore vitae quos odio, deserunt
              tempora sunt enim quo! Quibusdam?
            </p>
            <div className="flex flex-col items-center gap-y-2 justify-center tl:flex-row lg:justify-start gap-x-3 mt-4">
              <button className="py-2 px-4 bg-thrith hover:bg-orange-500 text-white rounded-md text-lg w-48 transition ease-in duration-150">
                <NavLink to={`${isLogin ? "/page/recommend" : "/recommend"}`}>
                  ระบบแนะนำบอร์ดเกม
                </NavLink>
              </button>
              <button className="py-2 px-4 border-2 border-black rounded-md text-lg w-40 transition ease-in duration-150">
                <NavLink to={`${isLogin ? "/page/party" : "/party"}`}>
                  ระบบค้นหาผู้เล่น
                </NavLink>
              </button>
            </div>
          </div>
          <div className="max-w-full w-full flex justify-center items-center order-1 lg:max-w-[550px] lg:w-full lg:order-2">
            <img
              src="/picture1.jpg"
              alt="picture1"
              className="w-[500px] rounded-md shakeAnimation"
            />
          </div>
        </div>

        <div className="mt-20 lg:mt-[260px]">
          <h3 className="font-bold text-4xl text-center tl:text-start mb-14">
            บอร์ดเกมยอดนิยม
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16">
            {popularListItem.map((entrie, index) => {
              return (
                <PopularListItem
                  key={index}
                  name={entrie.name}
                  picture={entrie.picture}
                  year={entrie.year}
                  id={entrie.id}
                  sequence={index}
                />
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
