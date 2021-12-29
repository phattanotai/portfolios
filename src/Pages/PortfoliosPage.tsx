import { FC, useState, useRef } from "react";
import { MainLayout } from "../styles/Layouts";
import Title from "../Components/Title";
import portfoliosData from "../data/portfolios";
import Menu from "../Components/Menu";
import Button from "../Components/Button";
import styled from "styled-components";

const allButtons = [
  "All",
  ...Array.from(new Set(portfoliosData.map((item) => item.category))),
];

let portfolios;

export type imgDataType = {
  url: string;
  width: string;
  height: string;
  type: string;
};

const PortfoliosPage: FC = () => {
  const [menuItem, setMenuItems] = useState(portfoliosData);
  const [button, setButtons] = useState(allButtons);
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [images, setImages] = useState<imgDataType[]>([]);
  let imageRef = useRef<HTMLImageElement>(null);
  let imgScollRef = useRef<HTMLDivElement>(null);
  let imgScollMobileRef = useRef<HTMLDivElement>(null);
  let imageShowRef = useRef<HTMLDivElement>(null);
  const checkMobile = window.matchMedia(
    "only screen and (max-width: 1024px)"
  ).matches;

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
    <>
      <PortfoliosDiv>
        <MainLayout>
          <Title title={"Portfolios"} span={"portfolios"} />
          <Button filter={filter} button={button} />
          <Menu menuItem={menuItem} />
        </MainLayout>
      </PortfoliosDiv>
    </>
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
`;
export default PortfoliosPage;
