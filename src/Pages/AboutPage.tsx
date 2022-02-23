import { FC } from "react";
import styled from "styled-components";
import ImageSection from "../Components/ImageSection";
import Title from "../Components/Title";
import { MainLayout } from "../styles/Layouts";
import ServicesSection from "../Components/ServicesSection";

import Particle from "../Components/Particle";
import PersonalInformation from "../Components/PersonalInformation";

const AboutPage: FC = () => {
  return (
    <AboutStyled>
      <Particle />
      <MainLayout>
        <Title title={"About Me"} span={"About Me"} />
        <ImageSection />
        <PersonalInformation />
        <ServicesSection />
      </MainLayout>
    </AboutStyled>
  );
};

const AboutStyled = styled.section`
  canvas {
    z-index: -1;
  }
`;

export default AboutPage;
