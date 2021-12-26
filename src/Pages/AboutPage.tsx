import React, { FC } from "react";
import styled from "styled-components";
import ImageSection from "../Components/ImageSection";
import Title from "../Components/Title";
import { MainLayout } from "../styles/Layouts";
import ServicesSection from "../Components/ServicesSection";
import ReviewsSection from "../Components/ReviewsSetion";
import Particle from "../Components/Particle";

const AboutPage: FC = () => {
  return (
    <div>
      <Particle />
      <MainLayout>
        <AboutStyled>
          <Title title={"About Me"} span={"About Me"} />
          <ImageSection />
          <ServicesSection />
          <ReviewsSection />
        </AboutStyled>
      </MainLayout>
    </div>
  );
};

const AboutStyled = styled.section``;

export default AboutPage;
