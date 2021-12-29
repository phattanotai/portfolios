import React, { useEffect, useState } from "react";
import loadingData from "../data/json/loading.json";
import successData from "../data/json/success.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import styled from "styled-components";

const defaultOptions1 = {
  loop: true,
  autoplay: true,
  animationData: loadingData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: successData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loading = ({ children }: any) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      setTimeout(() => {
        setSuccess(true);
      }, 1000);
    }, 3500);
  }, []);

  return (
    <LoadingDiv>
      {!success ? (
        <FadeIn>
          <div className="App-header">
            <div className="flaxBox">
              <h2 className="loading-text">Fetching</h2>
              {!loading ? (
                <Lottie options={defaultOptions1} height={140} width={140} />
              ) : (
                <Lottie options={defaultOptions2} height={140} width={140} />
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

  .loading-text {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }

  .flaxBox {
    text-align: center;
    display: flex;
    vertical-align: middle;
  }

  @media screen and (max-width: 1024px) {
  }
`;
export default Loading;
