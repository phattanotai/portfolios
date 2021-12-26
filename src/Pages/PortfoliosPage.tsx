import React, { FC, useState, useEffect } from "react";
import { MainLayout, InnerLayout } from "../styles/Layouts";
import Title from "../Components/Title";
import portfoliosData from "../data/portfolios";
import Menu from "../Components/Menu";
import Button from "../Components/Button";
import Particle from "../Components/Particle";
import { WorldMap } from "../threejs/WorldMap";
import { Portfolios } from "../threejs/Portfolios";

import styled from "styled-components";

import { RedBox } from "../threejs/RedBox";
import { Raycaster } from "../threejs/Raycaster";

const allButtons = [
  "All",
  ...Array.from(new Set(portfoliosData.map((item) => item.category))),
];

const PortfoliosPage: FC = () => {
  const [menuItem, setMenuItems] = useState(portfoliosData);
  const [button, setButtons] = useState(allButtons);

  useEffect(() => {
    const portfolios = new Portfolios();

    // new Raycaster();

    return () => {
      portfolios.onDestroy();
    };
  }, []);

  const filter = (button: string) => {
    if (button === "All") {
      setMenuItems(portfoliosData);
      return;
    }
    const filteredData = portfoliosData.filter(
      (item) => item.category === button
    );
    setMenuItems(filteredData);
  };

  return (
    <PortfoliosDiv>
      <div id="canvasContainer">
        <div className="icon-ui">
          <div className="icon-bar" id="icon-bar">
            <div
              className="icon-bar-item"
              id="icon-bar-stats"
              style={{
                backgroundImage: 'url("./assets/icons/ui/skills.png")',
              }}
            />
            <div
              className="icon-bar-item"
              id="icon-bar-inventory"
              style={{
                backgroundImage: 'url("./assets/icons/ui/backpack.png")',
              }}
            />
            <div
              className="icon-bar-item"
              id="icon-bar-quests"
              style={{
                backgroundImage: 'url("./assets/icons/ui/tied-scroll.png")',
              }}
            />
          </div>
        </div>
      </div>
    </PortfoliosDiv>

    // <MainLayout>
    //   <Title title={"Portfolios"} span={"portfolios"} />
    //   <InnerLayout>
    //     <Button filter={filter} button={button} />
    //     <Menu menuItem={menuItem} />
    //   </InnerLayout>
    // </MainLayout>
  );
};

const PortfoliosDiv = styled.div`
  body {
    color: #222;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #000000;
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
  }

  a {
    color: #2fa1d6;
  }

  #three-canvas: {
    position: absolute !important;
  }

  p {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 2em;
  }

  #blocker {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  #instructions {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }

  #info {
    position: absolute;
    top: 0 px;
    width: 100%;
    padding: 10 px;
    box-sizing: border-box;
    text-align: center;
    z-index: 1;
    color: black;
  }

  .icon-ui {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    top: 10px;
    // left: 40%;
    position: absolute;

    font-family: "IM Fell French Canon", serif;
  }

  .icon-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    z-index: 1;
  }

  .icon-bar-item {
    background-size: cover;
    width: 55px;
    height: 56px;

    margin: 2px;
  }

  .health-ui {
    background-image: url("./assets/icons/ui/health-bar.png");
    width: 500px;
    height: 300px;
    z-index: 1;
  }

  .health-bar {
    background: greenyellow;
    width: 200px;
    max-width: 200px;
    height: 40px;
    position: relative;
    top: 215px;
    left: 260px;
    border-style: solid;
    border-width: 2px;
    border-color: black;
    border-radius: 5px;
  }
`;
export default PortfoliosPage;
