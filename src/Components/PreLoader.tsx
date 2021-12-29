import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";

import location from "../data/json/world-locations.json";
import success from "../data/json/success-screen.json";
import styled from "styled-components";
import FadeIn from "react-fade-in";

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: location,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: success,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const PreLoader = ({ children }: any) => {
  const [loading, setloading] = useState(undefined);
  const [completed, setcompleted] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setloading(true);
      setTimeout(() => {
        setcompleted(true);
      }, 1000);
    }, 4000);
  }, []);

  return (
    <LoadingDiv>
      {!completed ? (
        <FadeIn>
          <div className="App-header">
            <div className="flaxBox">
              {!loading ? (
                <Lottie options={defaultOptions1} height={200} width={200} />
              ) : (
                <Lottie options={defaultOptions2} height={100} width={100} />
              )}
            </div>
          </div>
        </FadeIn>
      ) : (
        <>{children}</>
      )}
    </LoadingDiv>
  );
};

const LoadingDiv = styled.div`
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

export default PreLoader;
