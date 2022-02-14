import React, { FC } from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import Title from "./Title";
import ServiceCard from "./ServiceCard";

const design = "../assets/images/design.svg";
const intelligence = "../assets/images/intelligence.svg";
const gamedev = "../assets/images/game-dev.svg";

const ServicesSection: FC = () => {
  return (
    <InnerLayout>
      <ServicesSectionStyled>
        <Title title={"Services"} span={"services"} />
        <div className="services">
          <ServiceCard
            image={design}
            title={"Frontend Developer"}
            paragraph={`พัฒนาหรือเขียนเว็บไซต์ที่จะรองรับทุกขนาดหน้าจอของเครื่องมือต่างๆ 
            ไม่ว่าจะเข้าเว็บไซต์จากมือถือ แลปท็อป หรือคอมพิวเตอร์ตั้งโต๊ะ`}
          />
          <ServiceCard
            image={design}
            title={"Backend Developer"}
            paragraph={`บริการทำระบบหลังบ้านต่าง ๆ ของโปรแกรม เช่น RESTful APIs 
              และการ integrate 3rd parties APIs`}
          />
          <div className="mid-card">
            <ServiceCard
              image={intelligence}
              title={"Devops Engineer"}
              paragraph={`แนะนำกระบวนการ เครื่องมือ และวิธีการเพื่อสร้างสมดุลระหว่างความต้องการตลอดวงจรชีวิตการพัฒนาซอฟต์แวร์ 
                ตั้งแต่การเข้ารหัสและการปรับใช้ ไปจนถึงการบำรุงรักษาและการอัปเดต`}
            />
          </div>
          <div className="mid-card">
            <ServiceCard
              image={design}
              title={"Application Developer"}
              paragraph={"พัฒนาแอปพลิเคชันมือถือที่รองรับทุกระบบ"}
            />
          </div>
          <ServiceCard
            image={intelligence}
            title={"Infrastructure Engineer"}
            paragraph={`ดูแล Resource System, Server และ Storage โดยภาพรวม
             ทำการซ่อมบำรุง ระบบ System Server และ Storage 
             เฝ้าระวังและตรวจสอบการให้บริการระบบเครือข่ายและเซิร์ฟเวอร์ ที่ผิดปกติ 
             เมื่อได้รับแจ้งปัญหาให้ตรวจสอบสาเหตุของปัญหา ติดตั้งระบบปฏิบัติการ และ Configure อุปกรณ์ Server, 
             ระบบ Virtualization ระบบ Backup และอุปกรณ์ประกอบอื่นๆ เบื้องต้น`}
          />
        </div>

        {/* <ServiceCard
            image={gamedev}
            title={"Infrastructure Engineer"}
            paragraph={`ดูแล Resource System, Server และ Storage โดยภาพรวม
             ทำการซ่อมบำรุง ระบบ System Server และ Storage 
             เฝ้าระวังและตรวจสอบการให้บริการระบบเครือข่ายและเซิร์ฟเวอร์ ที่ผิดปกติ 
             เมื่อได้รับแจ้งปัญหาให้ตรวจสอบสาเหตุของปัญหา ติดตั้งระบบปฏิบัติการ และ Configure อุปกรณ์ Server, 
             ระบบ Virtualization ระบบ Backup และอุปกรณ์ประกอบอื่นๆ เบื้องต้น`}
          />
        </div> */}
      </ServicesSectionStyled>
    </InnerLayout>
  );
};

const ServicesSectionStyled = styled.section`
  .services {
    margin-top: 5rem;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      padding: 10px;
    }
    @media screen and (max-width: 950px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 650px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default ServicesSection;
