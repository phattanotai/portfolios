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
          <ProgressBar title={"HTML5"} width={"70%"} text={"70%"} />
          <ProgressBar title={"CSS3"} width={"70%"} text={"70%"} />
          <ProgressBar title={"JAVASCRIPT"} width={"85%"} text={"85%"} />
          <ProgressBar title={"PHP"} width={"50%"} text={"50%"} />
          <ProgressBar title={"PYTHON"} width={"40%"} text={"40%"} />
          <ProgressBar title={"GO"} width={"20%"} text={"20%"} />
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
    }
  }
`;

export default Skills;
