import React, { useEffect } from "react";

// global components
import Footer from "../../components/Footer";

// components
import ItemAbout from "./components/ItemAbout";

// assests
import AboutPictureOne from "../../assets/about-page-pictures/about1.svg";
import AboutPictureTwo from "../../assets/about-page-pictures/about2.svg";
import AboutPictureThree from "../../assets/about-page-pictures/about3.svg";
import AboutPictureFour from "../../assets/about-page-pictures/about4.svg";

function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  return (
    <React.Fragment>
      <main className="mt-12 mb-4 max-w-[1400px] mx-auto px-4">
        <ItemAbout
          order={0}
          img={AboutPictureOne}
          title={"ระบบแนะนำบอร์ดเกมของเรา"}
          content={
            "หากคุณเป็นคนที่ไม่เคยเล่นบอร์ดเกมแต่สนใจที่จะลองเล่นหรือเป็นผู้เล่นที่ชอบเล่นบอร์ดเกมอยู่แล้ว ต้องการที่จะหาบอร์ดเกมใหม่ ๆ ไม่ว่าจะเป็นเกมแนวเดิม หรือเกมแนวแปลกใหม่ มาลองใช้ระบบแนะนำบอร์ดเกมของเว็บไซต์เราดูสิ เพียงแค่คุณใส่ข้อมูลเกมที่คุณต้องการ ระบบของเราก็จะแนะนำเกมให้คุณ แม้คุณจะเป็นผู้เล่นใหม่ก็สามารถใช้งานได้ไม่ยาก"
          }
        />
        <ItemAbout
          order={1}
          img={AboutPictureTwo}
          title={"หากคุณมองหาผู้เล่นบอร์ดเกม"}
          content={
            "หากบอร์ดเกมที่คุณต้องการเล่นนั้นไม่สามารถที่จะเล่นคนเดียวได้ และคุณยังไม่มีกลุ่มเพื่อนที่จะเล่นด้วย คุณสามารถค้นหาผู้เล่นที่มีความสนใจเหมือนกันด้วยระบบปาร์ตี้ของเรา ที่จะทำให้คุณสามารถสร้างปาร์ตี้เพื่อให้ผู้อื่นมาเข้าร่วมกับคุณและคุณก็สามารถเข้าร่วมกับปาร์ตี้ผู้อื่นได้เช่นกัน"
          }
        />
        <ItemAbout
          order={2}
          img={AboutPictureThree}
          title={"ค้นหาร้านบอร์ดเกมที่ผู้เล่นต้องการ"}
          content={
            "เคยหรือไม่ แม้จะมีเพื่อนเล่นและมีเกมในดวงใจ แต่ไม่รู้จะไปเล่นที่ไหน เว็บไซต์ของเรามีระบบแนะนำร้านบอร์ดเกมใกล้เคียง เพียงแค่คุณใส่สถานที่ปัจจุบันของคุณ ระบบของเราจะทำการค้นหาและแนะนำร้านบอร์ดเกมที่อยู่ใกล้กับคุณมากที่สุด"
          }
        />
        <ItemAbout
          order={3}
          img={AboutPictureFour}
          title={"ประเมินเพื่ออนาคตที่ดี"}
          content={
            "เมื่อคุณทำการประเมินเกมที่คุณได้รับการแนะนำไปหรือใส่ข้อมูลเพิ่มว่าคุณเคยเล่นเกมอะไรมาบ้าง เว็บไซต์ของเราจะทำการเก็บข้อมูลดังกล่าว เพื่อนำไปปรับปรุงประสิทธิภาพการแนะนำให้เหมาะสมกับคุณมากขึ้น"
          }
        />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default About;
