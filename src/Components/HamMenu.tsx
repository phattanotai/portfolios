import { useSelector, useDispatch } from "react-redux";
import Lottie from "react-lottie";
import { IconButton } from "@material-ui/core";
import styled from "styled-components";
import { openNav } from "../redux-thunk/actions/navAction";

import ham from "../data/json/hamburger.json";
import { useEffect, useState } from "react";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: ham,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const HamMenu = ({ children }: any) => {
  const [height, setHeight] = useState<number>(150);
  const [width, setWidth] = useState<number>(150);
  // state manament redux
  const navToggle = useSelector((state: any) => state.nav);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkMobile = window.matchMedia(
      "only screen and (max-width: 767px)"
    ).matches;

    const checkTablet = window.matchMedia(
      "only screen and (max-width: 1024px)"
    ).matches;

    if (checkTablet) {
      setHeight(180);
      setWidth(125);
    }

    if (checkMobile) {
      setHeight(105);
      setWidth(85);
    }
  }, []);

  return (
    <HamMenuDiv>
      <IconButton onClick={() => dispatch(openNav(!navToggle))}>
        {/* <MenuIcon /> */}
        <Lottie options={defaultOptions} height={height} width={width} />
      </IconButton>
    </HamMenuDiv>
  );
};

const HamMenuDiv = styled.div`
  //Nav Toggler
  position: absolute;
  right: 0px;
  top: 4%;
  display: none;
  z-index: 15;

  button {
    padding: 0px;
  }
  svg {
    font-size: 3rem;
  }

  @media screen and (max-width: 1200px) {
    display: block;
  }
`;

export default HamMenu;
