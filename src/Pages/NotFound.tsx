import { FC } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";

import notfound from "../data/json/notFound.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: notfound,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const NotFound: FC = () => {
  return (
    <NotfoundDiv>
      <div className="App-header">
        <div className="flaxBox">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
    </NotfoundDiv>
  );
};

const NotfoundDiv = styled.div`
  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .flaxBox {
    text-align: center;
    display: flex;
  }
`;

export default NotFound;
