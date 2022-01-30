import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import Button from "@material-ui/core/Button";

export type PropsType = {
  imageShowRef: any;
  imageRef: any;
  indexImg: number;
  images: any;
};

const ImageShow: FC<PropsType> = ({
  imageShowRef,
  imageRef,
  indexImg,
  images,
}) => {
  const [imgIndex, setImgIndex] = useState<number>(indexImg);

  useEffect(() => {
    setImgIndex(indexImg);
  }, [indexImg]);

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

  return (
    <ImageShowDiv ref={imageShowRef}>
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
    </ImageShowDiv>
  );
};

export default ImageShow;

const ImageShowDiv = styled.div`
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
