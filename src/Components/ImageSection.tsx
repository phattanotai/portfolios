import { FC } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PrimaryButton from "./PrimaryButton";
const resume = "../assets/images/resume.jpg";
const resume2 = "../assets/images/resume2.jpg";
const ImageSection: FC = () => {
  const langType = useSelector((state: any) => state.lang);

  return (
    <ImageSectionStyled>
      <div className="left-content">
        {/* <img src={resume} alt="" /> */}
        <img src={resume2} alt="" />
      </div>
      <div className="right-content">
        <h4>
          <span>my name is</span>
        </h4>
        <h1>Phattanothai Pukham</h1>
        <h2>I build things for the web.</h2>
        {/* <p className="paragraph">
          I’m a software engineer specializing in building exceptional digital
          experiences. Currently, I’m focused on building accessible,
          human-centered products at Upstatement.
        </p> */}

        <p className="paragraph">
          I am interested in working as a programmer. And what I'm interested in
          is Computer Programming,Web/App Developer, Devops
        </p>
        <p>
          I don't have much work experience. But I am ready to learn and
          develop. I'm the type of person who likes a challenge. easy to get
          along with I like to try new things and develop myself all the time.
        </p>
        <br />
        <p>I hope that we will have the opportunity to work together.</p>
        <br />
        <div className="about-info">
          <div className="info-title">
            <p>Full Name :</p>
            <p>Date of birth :</p>
            <p>Nationality :</p>
            <p>Address :</p>
          </div>
          <div className="info">
            <p> Phattanothai Pukham</p>
            <p> 3 may 1993</p>
            <p> Thai </p>
            <p> 96 Moo.6 Tambon Thanthong, Amphur Phan, Chiang Rai 57250</p>
          </div>
        </div>
        <PrimaryButton
          title={"See Resume"}
          onClick={() => {
            window.open(
              `../html/Resume-Phattanothai-Pukham-${langType}.html`,
              "_blank"
            );
          }}
          style={{
            marginRight: "5px",
          }}
        />
        <PrimaryButton
          title={"Download"}
          onClick={() => {
            window.open(
              `../assets/resume/Resume-Phattanothai-Pukham-${langType}.pdf`,
              "_blank"
            );
          }}
        />
      </div>
    </ImageSectionStyled>
  );
};

const ImageSectionStyled = styled.div`
  margin-top: 5rem;
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    .left-content {
      margin-bottom: 2rem;
    }
  }
  .left-content {
    width: 100%;
    img {
      width: 95%;
      object-fit: cover;
    }
  }
  h1 {
    font-size: 2.7rem;
  }

  h2 {
    font-size: 1.8rem;
    color: var(--white-color);
  }

  .right-content {
    width: 100%;
    h4 {
      font-size: 1rem;
      color: var(--white-color);
      span {
        font-size: 1rem;
        color: #64ffda;
      }
    }
    .paragraph {
      padding: 1rem 0;
    }
    .about-info {
      display: flex;
      padding-bottom: 1.4rem;
      .info-title {
        padding-right: 3rem;
        width: 116%;
        p {
          font-weight: 600;
        }
      }
      .info-title,
      .info {
        p {
          padding: 0.3rem 0;
        }
      }
    }
  }
`;
export default ImageSection;
