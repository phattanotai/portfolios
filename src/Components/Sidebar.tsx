import { FC } from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

export type PropsType = {
  navToggle: any;
};

const Sidebar: FC<PropsType> = ({ navToggle }) => {
  return (
    <SidebarStyled className={`${navToggle ? "nav-toggle" : ""}`}>
      <Navigation />
    </SidebarStyled>
  );
};

const SidebarStyled = styled.div`
  width: 16.3rem;
  position: fixed;
  height: 100vh;
  background-color: var(--sidebar-dark-color);
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  @media screen and (max-width: 1200px) {
    transform: translateX(-100%);
    z-index: 20;
  }

  @media screen and (max-width: 1024px) {
    width: 34.3rem;
  }

  @media screen and (max-width: 768px) {
    width: 28.3rem;
  }

  @media screen and (max-width: 420px) {
    width: 18.3rem;
  }
`;

export default Sidebar;
