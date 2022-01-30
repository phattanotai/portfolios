import React, { FC } from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";
import Title from "./Title";
import ProgressBar from "./ProgressBar";

const Skills: FC = () => {
  return (
    <SkillsStyled>
      <Title title={"My Skills"} span={"my skills"} />
      <InnerLayout>
        <div className="skills">
          <ProgressBar title={"Graphic Design"} width={"20%"} text={"20%"} />
          <ProgressBar title={"Coding"} width={"90%"} text={"90%"} />
          <ProgressBar title={"Database"} width={"80%"} text={"80%"} />
          <ProgressBar title={"Server"} width={"70%"} text={"70%"} />
          <ProgressBar title={"Research"} width={"85%"} text={"85%"} />
          <ProgressBar title={"UX/UI"} width={"30%"} text={"30%"} />
          {/* <ProgressBar title={"UNITY"} width={"10%"} text={"10"} /> */}
        </div>
      </InnerLayout>
    </SkillsStyled>
  );
};

const SkillsStyled = styled.section`
  .skills {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 2rem;
    grid-column-gap: 3rem;
    @media screen and (max-width: 700px) {
      grid-template-columns: repeat(1, 1fr);
      padding: 10px;

      h3 {
        font-size: 1.5rem;
      }
    }
  }
`;

export default Skills;
