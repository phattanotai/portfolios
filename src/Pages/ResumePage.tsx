import React, { FC, useEffect } from "react";
import Skills from "../Components/Skills";
import { MainLayout } from "../styles/Layouts";
import Resume from "../Components/Resume";
import Particle from "../Components/Particle";
import { WorldMap } from "../threejs/WorldMap";

const ResumePage: FC = () => {
  useEffect(() => {
    // new WorldMap();
  }, []);
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
