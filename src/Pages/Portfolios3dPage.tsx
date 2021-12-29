import React, { FC, useState, useEffect, useRef } from "react";
import { MainLayout, InnerLayout } from "../styles/Layouts";
import Title from "../Components/Title";
import portfoliosData from "../data/portfolios";
import Menu from "../Components/Menu";
// import Button from "../Components/Button";
import Button from "@material-ui/core/Button";
import Particle from "../Components/Particle";
import { WorldMap } from "../threejs/WorldMap";
import { Portfolios } from "../threejs/Portfolios";

import styled from "styled-components";

import { RedBox } from "../threejs/RedBox";
import { Raycaster } from "../threejs/Raycaster";
import { Test } from "../threejs/Test";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaArrowDown,
  FaArrowLeft,
  FaArrowUp,
  FaArrowRight,
  FaArrowsAltH,
} from "react-icons/fa";

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

const Portfolios3dPage: FC = () => {
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

  useEffect(() => {
    portfolios = new Portfolios();
    const img: imgDataType[] = [];
    for (let index in portfolios.images) {
      const items = portfolios.images[index];

      for (let i = 0; i < items.length; i++) {
        const imagesData = items[i];
        for (let imageUrl of imagesData.images) {
          const data = {
            url: imageUrl,
            width: imagesData.category === "APP" ? "30%" : "86%",
            height: imagesData.category === "APP" ? "80%" : "90%",
            type: imagesData.category,
          };
          img.push(data);
        }
      }
    }
    setImages(img);

    setTimeout(() => {
      portfolios.showImage = showImage;
    }, 10000);
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

  const buttonClick = (btn) => {
    portfolios.moveForwardBtnT(btn);
  };

  const closeImage = () => {
    imageShowRef.current.style.display = "none";
  };

  const backImage = () => {
    let index = imgIndex - 1;
    setImgIndex(index);
    imageRef.current.src = images[index].url;
    imageRef.current.style.width = images[index].width;
    imageRef.current.style.height = images[index].height;
  };

  const forwardImage = () => {
    let index = imgIndex + 1;
    setImgIndex(index);
    imageRef.current.src = images[index].url;
    imageRef.current.style.width = images[index].width;
    imageRef.current.style.height = images[index].height;
  };

  const showImage = (index: number) => {
    imageShowRef.current.style.display = "block";
    console.log(images);
    imageRef.current.src = images[index].url;
    imageRef.current.style.width = images[index].width;
    imageRef.current.style.height = images[index].height;

    setImgIndex(index);
  };

  const showImgScoll = () => {
    if (
      imgScollRef.current.style.display === "none" ||
      !imgScollRef.current.style.display
    ) {
      imgScollRef.current.style.display = "block";
    } else {
      imgScollRef.current.style.display = "none";
    }
  };

  const showImgScollMobile = () => {
    if (
      imgScollMobileRef.current.style.display === "none" ||
      !imgScollMobileRef.current.style.display
    ) {
      imgScollMobileRef.current.style.display = "block";
    } else {
      imgScollMobileRef.current.style.display = "none";
    }
  };

  return (
    <>
      <PortfoliosDiv>
        <div id="canvasContainer">
          <IconUi>
            <div className="icon-ui">
              <div className="icon-bar" id="icon-bar">
                {/* <div
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
            /> */}
                <Button variant="outlined">
                  <div
                    className="icon-bar-item"
                    id="icon-bar-quests"
                    style={{
                      backgroundImage:
                        'url("./assets/icons/ui/tied-scroll.png")',
                    }}
                    onClick={() => {
                      if (!checkMobile) {
                        showImgScoll();
                      } else {
                        showImgScollMobile();
                      }
                    }}
                  />
                </Button>
              </div>
            </div>
          </IconUi>
          <ImageShow ref={imageShowRef}>
            <Button
              className="back"
              disabled={imgIndex <= 0 ? true : false}
              onClick={backImage}
            >
              <FaChevronLeft></FaChevronLeft>
            </Button>
            <img
              ref={imageRef}
              src="./assets/images/portImages/bet888/backoffice/2.jpg"
              alt=""
            />
            <Button
              className="forward"
              disabled={imgIndex >= images.length ? true : false}
              onClick={forwardImage}
            >
              <FaChevronRight></FaChevronRight>
            </Button>

            <Button className="close" onClick={closeImage}>
              <FaTimes></FaTimes>
            </Button>
          </ImageShow>
          <ImagesScoll ref={imgScollRef}>
            {images.map((item: imgDataType, index: number) => {
              return (
                <div key={index}>
                  <img
                    src={item.url}
                    alt=""
                    style={{
                      height: item.height,
                      width: item.width,
                    }}
                    onClick={() => {
                      showImage(index);
                    }}
                  />
                </div>
              );
            })}
          </ImagesScoll>
          <ImagesScollMobile ref={imgScollMobileRef}>
            {images.map((item: imgDataType, index: number) => {
              return (
                <div key={index}>
                  <img
                    src={item.url}
                    alt=""
                    style={{
                      height: "85%",
                      width: item.type === "APP" ? "25%" : "60%",
                    }}
                    onClick={() => {
                      showImage(index);
                    }}
                  />
                </div>
              );
            })}
          </ImagesScollMobile>

          <ControlUi>
            <div className="control-ui-w">
              <div className="icon-bar" id="icon-bar">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    buttonClick("w");
                  }}
                >
                  <FaArrowUp></FaArrowUp>
                </Button>
              </div>
            </div>
            <div className="control-ui-asd">
              <div className="icon-bar" id="icon-bar">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    buttonClick("a");
                  }}
                >
                  <FaArrowLeft></FaArrowLeft>
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    buttonClick("s");
                  }}
                >
                  <FaArrowDown></FaArrowDown>
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    buttonClick("d");
                  }}
                >
                  <FaArrowRight></FaArrowRight>
                </Button>
              </div>
            </div>

            <div className="control-ui-space">
              <div className="icon-bar" id="icon-bar">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => {
                    buttonClick("space");
                  }}
                >
                  <FaArrowsAltH></FaArrowsAltH>
                </Button>
              </div>
            </div>
          </ControlUi>
        </div>
      </PortfoliosDiv>

      {/* <MainLayout>
        <Title title={"Portfolios"} span={"portfolios"} />
        <InnerLayout>
          <Button filter={filter} button={button} />
          <Menu menuItem={menuItem} />
        </InnerLayout>
      </MainLayout> */}
    </>
  );
};

const ImagesScollMobile = styled.div`
  position: absolute;
  bottom: 30px;

  width: 100%;
  height: 20%;
  display: none;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  div {
    width: 30%;
    height: 100%;
    text-align: center;
    display: inline;
  }

  img {
    height: 85%;
    width: 60%;
    padding: 2px;
    border-radius: 15px;
    cursor: pointer;
  }
`;

const IconUi = styled.div`
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
    cursor: pointer;
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

  @media screen and (max-width: 1024px) {
    .icon-ui {
      top: 40px;
    }
    .icon-bar-item {
      width: 40px;
      height: 40px;
    }
  }
`;

const ImagesScoll = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30%;
  height: 95vh;
  display: none;
  overflow: scroll;
  background-color: black;

  div {
    width: 100%;
    height: 30%;
    text-align: center;
  }

  img {
    width: 100%;
    height: 30%;
    padding: 2px;
    border-radius: 15px;
    cursor: pointer;
  }

  ::-webkit-scrollbar {
    width: 0px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    right: 0px;
    top: 100px;
    div {
      width: 100%;
      height: 30%;
    }
    img {
      width: 100%;
      height: 30%;
    }
  }
  @media screen and (max-width: 320px) {
    right: -3px;
  }
`;

const ImageShow = styled.div`
  position: absolute;
  top: 0 px;
  width: 70%;
  height: 80%;
  padding: 10 px;
  padding-top: 50px;
  box-sizing: border-box;
  text-align: center;
  z-index: 20;
  color: white;
  display: none;

  img {
    width: 86%;
    height: 90%;
  }
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .back {
    position: absolute;
    top: 50%;
    left: 50px;
    color: blue;
  }
  .forward {
    position: absolute;
    top: 50%;
    right: 50px;
    color: blue;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 50%;
    top: 15%;
    .close {
      right: 0px;
    }

    .back {
      top: 50%;
      left: 10px;
    }
    .forward {
      top: 50%;
      right: 10px;
    }
  }
`;

const ControlUi = styled.div`
  display: none;
  .control-ui-w {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    bottom: 50px;
    left: 80px;
    position: absolute;
  }

  .control-ui-space {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    bottom: 10px;
    right: 10px;
    position: absolute;
  }

  .control-ui-asd {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    bottom: 10px;
    left: 10px;
    position: absolute;
    Button {
      margin: 2px;
    }
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

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
`;
export default Portfolios3dPage;
