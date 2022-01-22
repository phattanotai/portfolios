import React, { FC } from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import Title from "./Title";
import ServiceCard from "./ServiceCard";

const design = "../images/design.svg";
const intelligence = "../images/intelligence.svg";
const gamedev = "../images/game-dev.svg";

const ServicesSection: FC = () => {
  return (
    <InnerLayout>
      <ServicesSectionStyled>
        <Title title={"Services"} span={"services"} />
        <div className="services">
          <ServiceCard
            image={design}
            title={"Frontend Developere"}
            paragraph={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod."
            }
          />
          <ServiceCard
            image={design}
            title={"Backend Developere"}
            paragraph={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod."
            }
          />
          <div className="mid-card">
            <ServiceCard
              image={intelligence}
              title={"Application Developere"}
              paragraph={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod."
              }
            />
          </div>
          <div className="mid-card">
            <ServiceCard
              image={intelligence}
              title={"Devops"}
              paragraph={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod."
              }
            />
          </div>
          {/* <ServiceCard
            image={gamedev}
            title={"Game Development"}
            paragraph={
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem tenetur ratione quod."
            }
          /> */}
        </div>
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
