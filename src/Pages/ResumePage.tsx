import { FC } from "react";
import Skills from "../Components/Skills";
import { MainLayout } from "../styles/Layouts";
import Resume from "../Components/Resume";
import Particle from "../Components/Particle";

const ResumePage: FC = () => {
  return (
    <div>
      <Particle />
      <MainLayout>
        <Skills />
        <Resume />
      </MainLayout>
    </div>
  );
};

export default ResumePage;
