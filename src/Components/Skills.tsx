import { FC } from "react";
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
          <ProgressBar title={"Graphic Design"} width={"10%"} text={"Fair"} />
          <ProgressBar title={"Coding"} width={"75%"} text={"Fluent"} />
          <ProgressBar title={"Database"} width={"60%"} text={"Good"} />
          <ProgressBar title={"Server"} width={"50%"} text={"Standard"} />
          <ProgressBar title={"Research"} width={"90%"} text={"Excellent"} />
          <ProgressBar title={"UX/UI"} width={"15%"} text={"Fair"} />
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
