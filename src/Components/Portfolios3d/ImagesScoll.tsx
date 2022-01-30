import { FC } from "react";

import styled from "styled-components";

export type PropsType = {
  imgScollRef: any;
  images: any;
  showImage: any;
};

const ImagesScoll: FC<PropsType> = ({ imgScollRef, images, showImage }) => {
  return (
    <ImagesScollDiv ref={imgScollRef}>
      {images.map((item: any, index: number) => {
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
    </ImagesScollDiv>
  );
};

export default ImagesScoll;

const ImagesScollDiv = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30%;
  height: 95vh;
  display: none;
  overflow: scroll;
  background-color: darkgrey;
  z-index: 20;
  padding-top: 15px;
  border-radius: 10px;

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
