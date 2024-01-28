// assets
import FacebookIcon from "../assets/social-icons/facebook.svg";
import IgIcon from "../assets/social-icons/ig.png";
import SukachathumPicture from "../assets/developer-pictures/sukachathum.jpg";
import TiwatPicture from "../assets/developer-pictures/tiwat.jpg";
import Logo from "../assets/logo.png";

function Footer() {
  return (
    <main className="mt-16 lg:mt-40 bg-slate-100 p-4">
      <h3 className="text-3xl tl:text-4xl lg:text-5xl text-center font-bold mt-6">
        Board Game RecCommu
      </h3>
      <div className="text-center mt-4 text-xl md:text-2xl max-w-7xl w-full mx-auto">
        ระบบแนะนำบอร์ดเกมของเรา ถูกพัฒนาขึ้นโดยนิสิตวิศวกรรมคอมพิวเตอร์ชั้นปีที่
        4 มหาวิทยาลัยเกษตรศาสตร์
        เพื่อเป็นแนวทางและชุมชนสำหรับผู้ที่สนใจในการเล่นบอร์ดเกม
      </div>

      <div className="mt-4 p-4 max-w-2xl w-full mx-auto">
        <div className="flex items-center gap-x-6">
          <img src={SukachathumPicture} className="w-20 h-20 rounded-full" />
          <p className="text-xl sm:text-2xl">
            นายสุคชาธัม เซียวศิริถาวร รหัสนิสิต 6310500066
          </p>
        </div>

        <div className="flex items-center gap-x-6 mt-4">
          <img src={TiwatPicture} className="w-20 rounded-full" />
          <p className="text-xl sm:text-2xl">
            นายทิวัตถ์ ทรัพย์รัตนกุล รหัสนิสิต 6310500295
          </p>
        </div>
      </div>

      <div className="flex justify-center max-w-[1400px] w-full mx-auto mt-4">
        <hr className="h-[2px] w-full bg-gray-300" />
      </div>

      <div className="flex flex-col items-center gap-y-4 mt-6 lg:flex-row lg:justify-around">
        <div className="flex justify-center flex-grow">
          <img src={Logo} alt="skeleton" className="w-24 h-24" />
        </div>

        <div className="text-center text-xl md:text-2xl flex-grow">
          &copy; 2023 BoardGame RecCommu.
        </div>

        <div className="flex justify-center gap-4 flex-grow">
          <a href="https://www.facebook.com/nkana.jung" target="_blank">
            <img
              src={FacebookIcon}
              alt="facebook"
              className="w-[50px] cursor-pointer"
            />
          </a>
          <a href="https://www.instagram.com/kanadss" target="_blank">
            <img
              src={IgIcon}
              alt="instagram"
              className="w-[50px] cursor-pointer"
            />
          </a>
        </div>
      </div>
    </main>
  );
}

export default Footer;
