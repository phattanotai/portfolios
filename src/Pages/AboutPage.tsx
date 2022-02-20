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
    <div>
      {/* <Particle /> */}
      <MainLayout>
        <AboutStyled>
          <Title title={"About Me"} span={"About Me"} />
          <ImageSection />
          <PersonalInformation />
          <ServicesSection />
        </AboutStyled>
      </MainLayout>
    </div>
  );
};

const AboutStyled = styled.section``;

export default AboutPage;
