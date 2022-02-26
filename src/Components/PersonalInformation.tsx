import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Title from "./Title";

let in1 = "../assets/images/in1.jpg";
let in2 = "../assets/images/in2.JPG";
let in3 = "../assets/images/in3.jpg";
let in4 = "../assets/images/in4.jpg";
let in5 = "../assets/images/in5.jpeg";
let in6 = "../assets/images/in6.jpg";
let in8 = "../assets/images/in8.JPG";

const PersonalInformation: FC = () => {
  // const langType = useSelector((state: any) => state.lang);
  const { info } = useSelector((state: any) => state.main);

  // useEffect(() => {
  //   const checkMobile: boolean = window.matchMedia(
  //     "only screen and (max-width: 1024px)"
  //   ).matches;
  //   if (checkMobile) {
  //     in1 = "../assets/images/in4.jpg";
  //     in4 = "../assets/images/in1.jpg";
  //   }
  // }, []);

  return (
    info && (
      <PersonalInformationStyled>
        <Title title={"Information"} span={"Information"} />
        <br />
        <InformationStyled>
          <div className="left-content">
            <p className="paragraph">
              ตั้งแต่ตอนยังเด็ก
              เนื่องจากเป็นเด็กบ้านนอกจึงได้รับการศึกษาชั้นอนุบาล ถึง
              ชั้นประถมศึกษาที่โรงเรียนบ้านสันมะแฟน โรงเรียนประจำหมู่บ้าน
              และเมื่ออยู่ชั้นประถมศึกษาปีที่ 5 ก็ได้ไปเป็นเด็กวัด
              อยู่ช่วยงานที่วัด
            </p>
            <div className="info">
              <p>ชั้นอนุบาล</p>
              <p>ชั้นประถมศึกษา</p>
              <label> โรงเรียนบ้านสันมะแฟน จังหวัดเชียงราย</label>
            </div>
            <p className="paragraph">
              หลังจากเรียนจบชั้นประถมศึกษาที่ 6 แล้ว
              จึงได้ตัดสินใจเข้ารับการบรรพชาเป็นสามเณรเพื่อศึกษาพระธรรมต่อ
              เนื่องจากที่บ้านมีปัญหาทางการเงิน
              ไม่สามารถส่งเรียนต่อชั้นมัธยมศึกษาได้
              เมื่อบรรพชาแล้วได้ย้ายไปศึกษาที่วัดพระสิงห์ จังหวัดเชียงราย
            </p>
          </div>
          <div className="right-content">
            <div className="in-img">
              <img src={in6} alt="" />
              <p>รูปตอนเรียนชั้นประถมศึกษา</p>
            </div>
          </div>
        </InformationStyled>

        <InformationStyled>
          <div className="left-content">
            <div className="in-img">
              <img src={in1} alt="" />
              <p>รูปตอนรับพัดเปรียญธรรม 6 ประโยค ณ วัดพระศรีรัตนศาสดาราม</p>
            </div>
          </div>
          <div className="right-content">
            <p className="paragraph">
              หลังจากสอบไล่ได้ เปรียญธรรม 3 ประโยคแล้ว
              จึงได้ย้ายไปศึกษาต่อเปรียญธรรม ประโยค 4 ที่วัดจองคำ จังหวัดลำปาง
              เพราะว่าที่นั้นขึ้นชื่อเรื่องการเรียนการสอนที่สุดในภาคเหนือ
            </p>
            <div className="info">
              <p>ชั้นนักธรรม ตรี โท เอก </p>
              <p>ชั้นบาลีไวยากรณ์</p>
              <p>ชั้นบาลีเปรียญธรรม 1-3 ประโยค</p>
              <label>วัดพระสิงห์ จังหวัดเชียงราย</label>
            </div>

            <div className="info">
              <p>บาลีเปรียญธรรม 4 ประโยค </p>
              <label> วัดจองคำ จังหวัดลำปาง</label>
            </div>
          </div>
        </InformationStyled>

        <InformationStyled>
          <div className="left-content">
            <p className="paragraph">
              หลังจากสอบไล่ได้เปรียญธรรม 4 ประโยคแล้ว
              จึงได้ตัดสินใจย้ายไปเพื่อเข้าศึกษาต่อที่วัดในกรุงเทพ
              เพื่อหาความรู้และประสบการณ์ที่มากขึ้น
              จึงได้เข้ามาเรียนต่อในชั้นเปรียญธรรม 5 ที่วัดปากน้ำ ภาษีเจริญ
              เพราะเป็นวัดใหญ่ มีโรงเรียนสอนพระปริยัติธรรมที่มีชื่อเสียง
              มีครูบาอาจารย์เก่งๆมากมาย มีสิ่งอำนวยสะดวกต่อการศึกษาเล่าเรียน
            </p>
            <div className="info">
              <p>บาลีเปรียญธรรม 5-8 ประโยค </p>
              <label>วัดปากน้ำภาษีเจริญ กรุงเทพมหานคร</label>
            </div>
          </div>
          <div className="right-content">
            <div className="in-img">
              <img src={in8} alt="" />
              <p>รูปตอนเรียนมหาลัย</p>
            </div>
          </div>
        </InformationStyled>

        <InformationStyled>
          <div className="left-content">
            <div className="in-img">
              <img src={in4} alt="" />
              <p>รูปตอนไปช่วยหมูป่าติดถ้ำ</p>
            </div>
          </div>
          <div className="right-content">
            <p className="paragraph">
              เมื่อสอบไล่ได้เปรียญธรรม 6 ประโยค
              ได้เห็นประกาศที่วัดไตรมิตรเปิดรับสมัครให้พระภิกษุสามเณรที่มีวุฒิบาลีตั้งแต่เปรียญธรรม
              6
              ประโยคขึ้นไปเข้ารับการศึกษาต่อชั้นปริญญาตรีที่มหาวิทยาลัยราชภัฏสวนสุนันทา
              เนื่องจากทางวัดไตรมิตรร่วมมือกับทางมหาวิทยาลัยราชภัฏสวนสุนันทา
              โดยทางวัดไตรมิตรจะเป็นผู้รับผิดชอบค่าใช้จ่ายในการศึกษาให้
              ได้เห็นถึงโอกาศที่จะได้ศึกษาต่อและเห็นถึงความสำคัญของเทคโนโลยีคอมพิวเตอร์ในยุคสมัยใหม่
            </p>
            <p>จึงได้เอาวุฒิเปรียญธรรม 6 ไปสอบเทียบเพื่อเข้าศึกษาต่อ </p>
          </div>
        </InformationStyled>

        <InformationStyled>
          <div className="left-content">
            <div className="info">
              <p>ปริญญาตรี</p>
              <label>
                มหาวิทยาลัยราชภัฏสวนสุนันทา สาขาวิทยาการคอมพิวเตอร์
                คณะวิทยาศาสตร์และเทคโนโลยีสารสนเทศ
              </label>
            </div>
            <p className="paragraph">
              ในปี 2559 หลังเรียนจบปริญญาตรีแล้ว และสอบตกเปรียญธรรม 9 ประโยค
              ทำให้หมดสิทธิ์ได้เป็นนาคหลวง
              เพราะไม่สามารถสอบได้ตั้งแต่ตอนเป็นสามเณรได้
              ทำให้ค่อนข้างผิดหวังที่ไม่สามรถทำตามที่ปรารถนาตั้งแต่ยังเด็กได้
              จึงอุปสมบทเป็นพระภิกษุ ณ วัดปากน้ำ ภาษีเจริญ
            </p>
          </div>
          <div className="right-content">
            <div className="in-img">
              <img src={in3} alt="" />
            </div>
          </div>
        </InformationStyled>

        <InformationStyled>
          <div className="left-content">
            <div className="in-img">
              <img src={in2} alt="" />
            </div>
          </div>
          <div className="right-content">
            <p className="paragraph">
              หลังจากอุปสมบทแล้ว เมื่อถึงวันเกณฑ์ทหาร
              ก็ได้ตัดสินใจเข้ารับการเกณฑ์ทหาร และเพราะจับได้ใบแดง ทบ1
              จึงทำการลาสิกขาไปเพื่อรับใช้ชาติที่ มทบ 37 ค่ายเม็งรายมหาราช
              ในระหว่างการฝึกนั้น
              ก็มีส่วนร่วมในการเข้าช่วยในเหตุการหมูป่าที่ติดอยู่ในถ้ำหลวง
              ที่อำเภอแม่สาย จังหวัดเชียงรายด้วย
            </p>

            <p className="paragraph">
              เมื่อเสร็จสิ้นการฝึกแล้ว
              จึงได้มีการแยกย้ายขึ้นหน่อยที่ประจำการอยู่
              จึงได้มีโอกาศไปช่วยทำงานที่ โรงพยาบาลค่ายเม็งรายมหาราย
            </p>

            <p className="paragraph">
              หลังจากการปลดประจำการแล้ว เพื่อจะได้อยู่ดูแลใกล้ชิดพ่อแม่
              จึงได้สมัครเข้าทำงานที่บริษัท gps tracker
              แห่งหนึ่งในจังหวัดเชียงราย ในตำแหน่ง programmer
              ได้รับผิดชอบในการพัฒนาระบบต่างๆให้กับทางบริษัท ไม่ว่าจะเป็น
              เว็บแอพ โมบายแอพ ดูแลเซิพเวอร์ ดูแลฐานข้อมูล ช่วยดูแลระบบคอม
              ระบบบัญชีต่างๆ เป็นต้น
            </p>
          </div>
        </InformationStyled>

        <InformationStyled>
          <div className="left-content">
            <p className="paragraph">
              แต่ เพื่อหาประการณ์ในการทำงานเพิ่มขึ้น จึงได้ไปสมัครงานในตำแหน่ง
              developer
              ที่บริษัทรับจัดทำซอร์ฟแวร์สำเร็จรูปอีกแห่งหนึ่งในจังหวัดเชียงราย
              และเนื่องจากทางษริษัทจะย้ายที่ทำงานไปที่อื่น ซึ่งไปสะดวกย้ายไปด้วย
              จึงได้ลาออกจากบริษัทนั้น
            </p>

            <p className="paragraph">
              หลังจากออกจากที่นั้นแล้ว ได้สมัครงาน ตำแหน่ง full stack developer
              ที่บริษัทแห่งหนึ่งในจังหวัดเชียงใหม่ ซึ่งเป็นงาน remote work
              สามารถทำที่บ้านได้
            </p>
          </div>
          <div className="right-content">
            <div className="in-img">
              <img src={in5} alt="" />
            </div>
          </div>
        </InformationStyled>
      </PersonalInformationStyled>
    )
  );
};

const InformationStyled = styled.div`
  display: flex;

  div {
    display: grid;
    /* margin-top: 7%; */
    margin-bottom: 5%;
  }
  span {
    font-size: 20px;
    color: #d49c6b;
  }

  h1 {
    font-size: 2.7rem;
  }

  h2 {
    font-size: 1.8rem;
    color: var(--white-color);
  }

  h4 {
    font-size: 1rem;
    color: var(--white-color);
    span {
      font-size: 1rem;
      color: #64ffda;
    }
  }

  .in-img {
    img {
      width: 95%;
      object-fit: cover;
      margin-bottom: 5px;
      padding-top: 15px;

      border-radius: 35px;
    }
    p {
      font-size: 14px;
      text-align: center;
    }
  }
  .paragraph {
    padding: 1rem 0;
    padding-bottom: 0px;
    padding-top: 0px;
    text-align: left;
    text-indent: 1.5em;
  }

  .info {
    margin-top: 20px;
    padding-left: 5%;
    label {
      padding-left: 5%;
    }
  }
  .left-content {
    width: 100%;
    padding: 5px;
  }

  .right-content {
    width: 100%;
    padding: 5px;
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    .left-content {
      margin-bottom: 2rem;
      align-items: center;
      text-align: center;
    }
    .right-content {
      padding: 10px;
    }
    h1 {
      font-size: 1.7rem;
    }
    .info {
      margin-top: 20px;
      padding-left: 10%;
      text-align: left;
      label {
        padding-left: 8%;
      }
    }
    .in-img {
      img {
        border-radius: 35px;
      }
      p {
        font-size: 14px;
        text-align: center;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .info {
      /* display: none; */
    }
  }
`;

const PersonalInformationStyled = styled.div`
  margin-top: 5rem;
`;
export default PersonalInformation;
