import { FC, useState, useEffect, useRef } from "react";
import Button from "@material-ui/core/Button";
import { Portfolios } from "../Threejs/Portfolios";
import styled from "styled-components";
import { useHistory } from "react-router";
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
import ImagesScoll from "../Components/Portfolios3d/ImagesScoll";
import Blocker from "../Components/Portfolios3d/Blocker";
import ImageShow from "../Components/Portfolios3d/ImageShow";

let portfolios: Portfolios;

export type imgDataType = {
  url: string;
  width: string;
  height: string;
  type: string;
};

const Portfolios3dPage: FC = () => {
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [images, setImages] = useState<imgDataType[]>([]);
  const [blocker, setBlocker] = useState<boolean>(false);

  let imageRef = useRef<HTMLImageElement>(null);
  let imgScollRef = useRef<HTMLDivElement>(null);
  let imgScollMobileRef = useRef<HTMLDivElement>(null);
  let imageShowRef = useRef<HTMLDivElement>(null);

  const history = useHistory<string>();

  const checkMobile = window.matchMedia(
    "only screen and (max-width: 1200px)"
  ).matches;

  useEffect(() => {
    portfolios = new Portfolios();
    setBlocker(true);
    if (checkMobile) {
      history.replace("portfolios");
    }

    return () => {
      console.log(portfolios, blocker);
      if (portfolios && !blocker) {
        portfolios.onDestroy();
      }
    };
  }, []);

  const showImage = (index: number) => {
    imageShowRef.current.style.display = "block";
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

  const buttonTouchStart = (btn: string) => {
    portfolios.moveForwardBtnT(btn);
  };
  const buttonTouchEnd = (btn: string) => {
    portfolios.moveForwardBtnF(btn);
  };

  const goToNormal = () => {
    history.replace("portfolios");
  };

  const createModelGUI = () => {
    portfolios.createModelGUI();
  };
  const continues3D = () => {
    setBlocker(false);
    portfolios.onInit();

    const img: imgDataType[] = [];

    if (portfolios) {
      for (let index in portfolios.images) {
        const items = portfolios.images[index];

        for (let i = 0; i < items.length; i++) {
          const imagesData = items[i];
          for (let imageUrl of imagesData.images) {
            const data = {
              url: imageUrl,
              width: imagesData.width ? imagesData.width : "86%",
              height: imagesData.height ? imagesData.height : "90%",
              type: imagesData.category,
            };
            img.push(data);
          }
        }
      }
      setImages(img);
    }
  };

  return (
    <>
      <PortfoliosDiv>
        <Blocker
          goToNormal={goToNormal}
          continues3D={continues3D}
          blocker={blocker}
        />
        <div id="canvasContainer">
          <IconUi style={{ display: !blocker ? "block" : "none" }}>
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
                <Button variant="outlined">
                  <div
                    className="icon-bar-item"
                    id="icon-bar-stats"
                    style={{
                      backgroundImage: 'url("./assets/icons/ui/skills.png")',
                    }}
                    onClick={() => {
                      createModelGUI();
                    }}
                  />
                </Button>
              </div>
            </div>
          </IconUi>

          <ImageShow
            imageShowRef={imageShowRef}
            imageRef={imageRef}
            indexImg={imgIndex}
            images={images}
          />

          <ImagesScoll
            imgScollRef={imgScollRef}
            images={images}
            showImage={showImage}
          />

          {/* <ImagesScollMobile ref={imgScollMobileRef}>
            {images.map((item: imgDataType, index: number) => {
              return (
                <div key={index}>
                  <img
                    src={item.url}
                    alt=""
                    style={{
                      height: "85%",
                      width: item.width ? "25%" : "60%",
                    }}
                    onClick={() => {
                      showImage(index);
                    }}
                  />
                </div>
              );
            })}
          </ImagesScollMobile> */}

          <ControlUi>
            <div className="control-ui-w">
              <div className="icon-bar" id="icon-bar">
                <Button
                  color="primary"
                  variant="contained"
                  onTouchStart={() => {
                    buttonTouchStart("w");
                  }}
                  onTouchEnd={() => {
                    buttonTouchEnd("w");
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
                  onTouchStart={() => {
                    buttonTouchStart("a");
                  }}
                  onTouchEnd={() => {
                    buttonTouchEnd("a");
                  }}
                >
                  <FaArrowLeft></FaArrowLeft>
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onTouchStart={() => {
                    buttonTouchStart("s");
                  }}
                  onTouchEnd={() => {
                    buttonTouchEnd("s");
                  }}
                >
                  <FaArrowDown></FaArrowDown>
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onTouchStart={() => {
                    buttonTouchStart("d");
                  }}
                  onTouchEnd={() => {
                    buttonTouchEnd("d");
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
                  onTouchStart={() => {
                    buttonTouchStart("space");
                  }}
                  onTouchEnd={() => {
                    buttonTouchEnd("space");
                  }}
                >
                  <FaArrowsAltH></FaArrowsAltH>
                </Button>
              </div>
            </div>
          </ControlUi>
        </div>
      </PortfoliosDiv>
    </>
  );
};

const ImagesScollMobile = styled.div`
  z-index: 2;
  position: absolute;
  bottom: 30px;
  width: 100%;
  height: 20%;
  display: block;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  div {
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
  Button {
    margin: 5px;
    padding: 0px;
    background-color: brown;
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
    z-index: 10;
  }

  .control-ui-space {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    bottom: 10px;
    right: 10px;
    position: absolute;
    z-index: 10;
  }

  .control-ui-asd {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    bottom: 10px;
    left: 10px;
    position: absolute;
    z-index: 10;
    Button {
      margin: 2px;
    }
  }

  @media screen and (max-width: 1024px) {
    display: block;
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

  #three-canvas {
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
