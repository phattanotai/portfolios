import React, { FC } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import menu from "../data/menu";
import { useSelector, useDispatch } from "react-redux";

import { openNav } from "../redux-thunk/actions/navAction";

const avatar = "../assets/images/avatar.jpg";

const Navigation: FC = () => {
  const langType = useSelector((state: any) => state.lang) || "EN";
  const navToggle = useSelector((state: any) => state.nav);
  const dispatch = useDispatch();

  const setNavToggle = () => {
    dispatch(openNav(!navToggle));
  };

  return (
    <NavigationStyled>
      <div className="avatar">
        <img src={avatar} alt="Phattanothai Pukham" />
      </div>
      <ul className="nav-items">
        <li className="nav-item" onClick={setNavToggle}>
          <NavLink to="/" activeClassName="active-class" exact>
            {menu[langType].home}
          </NavLink>
        </li>
        <li className="nav-item" onClick={setNavToggle}>
          <NavLink to="/about" activeClassName="active-class" exact>
            {menu[langType].about}
          </NavLink>
        </li>
        <li className="nav-item" onClick={setNavToggle}>
          <NavLink to="/resume" activeClassName="active-class" exact>
            {menu[langType].resume}
          </NavLink>
        </li>
        <li className="nav-item" onClick={setNavToggle}>
          <NavLink to="/portfolios" activeClassName="active-class" exact>
            {menu[langType].portfolios}
          </NavLink>
        </li>
        <li className="nav-item" onClick={setNavToggle}>
          <NavLink to="/portfolios3d" activeClassName="active-class" exact>
            {menu[langType].portfolios3d}
          </NavLink>
        </li>
        <li className="nav-item" onClick={setNavToggle}>
          <NavLink to="/contact" activeClassName="active-class" exact>
            {menu[langType].contact}
          </NavLink>
        </li>
      </ul>
      <footer className="footer">
        <p>
          @2021 <b>Phattanothai Pukham</b>
        </p>
      </footer>
    </NavigationStyled>
  );
};

const NavigationStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
  border-right: 1px solid var(--border-color);
  .avatar {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    text-align: center;
    padding: 1rem 0;
    img {
      width: 70%;
      border-radius: 50%;
      border: 8px solid var(--border-color);

      &:hover {
        border: 5px solid var(--primary-color);
        transform: translateZ(15px);
      }
    }
  }

  .nav-items {
    width: 100%;
    text-align: center;

    overflow: auto;

    /* width */
    ::-webkit-scrollbar {
      width: 0px;
    }

    .active-class {
      background-color: var(--primary-color-light);
      color: white;
    }
    li {
      display: block;
      a {
        display: block;
        padding: 0.45rem 0;
        position: relative;
        z-index: 10;
        text-transform: uppercase;
        transition: all 0.4s ease-in-out;
        font-weight: 600;
        letter-spacing: 1px;
        &:hover {
          cursor: pointer;
          color: var(--white-color);
        }
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 50%;
          background-color: var(--primary-color);
          transition: All 0.4s cubic-bezier(1, -0.2, 0.25, 0.95);
          opacity: 0.21;
          z-index: -1;
        }
      }

      a:hover::before {
        width: 100%;
        height: 100%;
      }
    }
  }

  footer {
    border-top: 1px solid var(--border-color);
    width: 100%;
    p {
      padding: 1.3rem 0;
      font-size: 1.1rem;
      display: block;
      text-align: center;
    }
  }

  @media screen and (max-width: 1024px) {
    .nav-items {
      a {
        font-size: 30px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    height: 90vh;
    .nav-items {
      a {
        font-size: 23px;
      }
    }
    .avatar {
      img {
        width: 40%;
      }
    }
  }

  @media screen and (max-width: 420px) {
    .nav-items {
      a {
        font-size: 16px;
      }
    }
  }
`;
export default Navigation;
