import { FC, useState } from "react";
import { MainLayout } from "../styles/Layouts";
import Title from "../Components/Title";
import portfoliosData from "../data/portfolios";
import { PortfoliosType } from "../data/portfolios";
import Menu from "../Components/Menu";
import Button from "../Components/Button";
import styled from "styled-components";
import Particle from "../Components/Particle";
// const allButtons = [
//   "All",
//   ...Array.from(new Set(portfoliosData.map((item) => item.category))),
// ];

let allButtons: string[] = ["All"];
portfoliosData.map((item) => {
  allButtons = [...allButtons, ...item.category];
});
allButtons = [...Array.from(new Set(allButtons))];
export type imgDataType = {
  url: string;
  width: string;
  height: string;
  type: string;
};

const PortfoliosPage: FC = () => {
  const [menuItem, setMenuItems] = useState<PortfoliosType[]>(portfoliosData);
  const [button] = useState<string[]>(allButtons);

  // const checkMobile: boolean = window.matchMedia(
  //   "only screen and (max-width: 1024px)"
  // ).matches;

  const filter = (button: string) => {
    if (button === "All") {
      setMenuItems(portfoliosData);
      return;
    }
    const filteredData = portfoliosData.filter((item) =>
      item.category.includes(button)
    );
    setMenuItems(filteredData);
  };

  return (
    <PortfoliosDiv>
      <Particle />
      <MainLayout>
        <Title title={"Portfolios"} span={"portfolios"} />
        <Button filter={filter} button={button} />
        <Menu menuItem={menuItem} />
      </MainLayout>
    </PortfoliosDiv>
  );
};

const PortfoliosDiv = styled.div`
  canvas {
    z-index: -10;
  }
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

  p {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 0 2em;
  }
`;
export default PortfoliosPage;
