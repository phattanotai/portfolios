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
  const langType = useSelector((state: any) => state.lang);

  const checkMobile: boolean = window.matchMedia(
    "only screen and (max-width: 1024px)"
  ).matches;

  useEffect(() => {
    if (checkMobile) {
      in1 = "../assets/images/in4.jpg";
      in4 = "../assets/images/in1.jpg";
    }
  }, []);

  return (
    <PersonalInformationStyled>
      <Title title={"Information"} span={"Information"} />
      <br />
      <InformationStyled>
        <div className="left-content">
          <p className="paragraph">
            ตอนเป็นเด็กได้เข้ารับการศึกษาชั้น อนุบาล ถึง
            ชั้นประถมศึกษาที่โรงเรียนบ้านสันมะแฟน ซึ่งเป็นโรงเรียนประจำหมู่บ้าน
          </p>
          <div className="info">
            <p>ชั้นอนุบาล</p>
            <p>ชั้นประถมศึกษา</p>
            <label> โรงเรียนบ้านสันมะแฟน จังหวัดเชียงราย</label>
          </div>
          <p className="paragraph">
            เมื่อเรียนจบชั้นประถมศึกษาที่ 6 แล้ว
            เนื่องจากที่บ้านมีปัญหาทางการเงินไม่สามารถส่งเรียนต่อชั้นมัธยมศึกษาได้
            แต่เพราะได้ไปเป็นเด็กวัด อยู่ช่วยงานอยู่ที่วัดตั้งแต่เล็กๆ
            กับเพื่อนอีก 2-3 คน จึงได้ตัดสินใจเข้ารับการบรรพชาเป็นสามเณร
            เพื่อศึกษาพระปริยัติธรรมบาลีต่อ ที่วัดพระสิงห์ จังหวัดเชียงราย
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
            อยู่ที่วัดพระสิงห์จนสอบไล่ได้ เปรียญธรรม 3 ประโยคแล้ว
            จึงได้ย้ายไปศึกษาต่อเปรียญธรรม ประโยค 4 ต่อที่วัดจองคำ จังหวัดลำปาง
            เพราะที่นั้นขึ้นชื่อเรื่องการเรียนการสอนที่สุดในภาคเหนือ
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
            จึงได้ตัดสินใจขอลาเพื่อเข้าศึกษาต่อที่วัดในกรุงเทพ
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
            <img src={in4} alt="" />
          </div>
        </div>
      </InformationStyled>

      <InformationStyled>
        <div className="left-content">
          <div className="in-img">
            <img src={in3} alt="" />
          </div>
        </div>
        <div className="right-content">
          <p className="paragraph">
            เมื่อสอบไล่ได้เปรียญธรรม 6 ประโยค
            ได้เห็นถึงความสำคัญของเทคโนโลยีคอมพิวเตอร์ จึงได้เอาวุฒิเปรียญธรรม 6
            ไปสอบเทียบเพื่อเข้าศึกษาต่อที่มหาวิทยาลัยราชภัฏสวนสุนันทา
            เนื่องจากทางวัดไตรมิตรร่วมกับทางมหาวิทยาลัยราชภัฏสวนสุนันทา
            ได้เปิดโอกาศให้พระภิกษุสามเณรที่มีวุฒิบาลีตั้งแต่เปรียญธรรม 6
            ประโยคขึ้นไปเข้ารับการศึกษาต่อชั้นปริญญาตรีได้
            โดยทางวัดไตรมิตรจะเป็นผู้รับผิดชอบค่าใช้จ่ายในการศึกษาให้มากน้อยตามผลการเรียนในเทอมนั้นๆ
          </p>
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
            หลังเรียนจบปริญญาตรีแล้ว และสอบเปรียญธรรม 9 ประโยค ในปี 2559 นั้น
            แต่เนื่องจากไม่สามารถสอบผ่านบาลีเปรียญธรรม 9 โยค ได้ตอนเป็นสามเณร
            จึงหมดสิทธิ์ได้เป็นนาคหลวง
            ทำให้ค่อนข้างผิดหวังที่ไม่สามรถทำตามที่ปรารถนาตั้งแต่ยังเด็กได้
            จึงอุปสมบทเป็นพระภิกษุ ณ วัดปากน้ำ ภาษีเจริญ
          </p>
        </div>
        <div className="right-content">
          <div className="in-img">
            <img src={in2} alt="" />
          </div>
        </div>
      </InformationStyled>

      <InformationStyled>
        <div className="left-content">
          <div className="in-img">
            <img src={in5} alt="" />
          </div>
        </div>
        <div className="right-content">
          <p className="paragraph">
            เมื่อถึงเดือนเมษายน ก็ได้ตัดสินใจเข้ารับการเกณฑ์ทหาร
            เนื่องจากจับได้ใบแดง ทบ1 ก็ได้ทำการลาสิกขาไปเพื่อรับใช้ชาติที่ มทบ
            37 ค่ายเม็งรายมหาราช ได้เข้ารับการฝึกทหารใหม่ เป็นเวลา 2 เดือน
            และในระหว่างการฝึกนั้น
            ได้เข้าร่วมช่วยในเหตุการหมูป่าที่ติดอยู่ในถ้ำหลวง ที่อำเภอแม่สาย
            จังหวัดเชียงรายด้วย
          </p>

          <p className="paragraph">
            เมื่อเสร็จสิ้นการฝึกแล้ว จึงได้มีการแยกย้ายขึ้นหน่อยที่ประจำการอยู่
            จึงได้มีโอกาศไปช่วยทำงานที่ โรงพยาบาลค่ายเม็งรายมหาราย
          </p>

          <p className="paragraph">
            หลังจากได้การปลดประจำการแล้ว เพื่อจะได้อยู่ดูแลพ่อแม่ใกล้ๆ
            ก็ได้หางานทำที่จังหวัดเชียงราย ก็ได้มีโอกาศได้เข้าทำงานที่บริษัท gps
            tracker แห่งหนึ่งในจังหวัดเชียงราย ในตำแหน่ง programmer
            ได้รับผิดชอบในการพัฒนาระบบต่างๆให้กับทางบริษัท ไม่ว่าจะเป็น เว็บแอพ
            โมบายแอพ ดูแลเซิพเวอร์ ดูแลฐานข้อมูล ช่วยดูแลระบบคอม ระบบบัญชีต่างๆ
            เป็นต้น
          </p>
        </div>
      </InformationStyled>

      <InformationStyled>
        <div className="left-content">
          <p className="paragraph">
            แต่เพื่อหาประการณ์ในการทำงานเพิ่มขึ้น จึงได้ไปสมัครงานในตำแหน่ง
            developer
            ที่บริษัทรับจัดทำซอร์ฟแวร์สำเร็จรูปอีกแห่งหนึ่งในจังหวัดเชียงราย
            แต่เนื่องจากทางษริษัทจะทำงานย้ายที่ทำงานไปที่อื่น
            ซึ่งไปสะดวกย้ายไปด้วย จึงได้ลาออกจากบริษัทนั้น
          </p>

          <p className="paragraph">
            หลังจากนั้น ได้ไปสมัครงาน ตำแหน่ง full stack developer
            ที่บริษัทแห่งหนึ่งในจังหวัดเชียงใหม่ ซึ่งเป็นงาน work from home
            สามารถทำที่บ้านได้
          </p>
        </div>
        <div className="right-content">
          <div className="in-img">
            <img src={in8} alt="" />
          </div>
        </div>
      </InformationStyled>
    </PersonalInformationStyled>
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
  }
`;

const PersonalInformationStyled = styled.div`
  margin-top: 5rem;
`;
export default PersonalInformation;
