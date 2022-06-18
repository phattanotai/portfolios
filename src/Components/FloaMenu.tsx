import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import LanguageSwitcherSelector from "./LanguageSwitcherSelector";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Switch from "@material-ui/core/Switch";

const FloaMenu: FC = () => {
  const [checked, setChecked] = useState<boolean>(
    localStorage.getItem("theme") === "light-theme" ? true : false
  );
  const [openMenu, setOpenmenu] = useState<boolean>(false);

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme")
      ? String(localStorage.getItem("theme"))
      : "dark-theme"
  );

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const themeToggler = () => {
    if (theme === "light-theme") {
      setTheme("dark-theme");
      setChecked(false);
      localStorage.setItem("theme", "dark-theme");
    } else {
      setTheme("light-theme");
      setChecked(true);
      localStorage.setItem("theme", "light-theme");
    }
  };

  return (
    <FloaMenuDiv>
      <div className={"theme  " + (openMenu ? "open" : "")}>
        <div
          className="style-switcher "
          onClick={() => {
            setOpenmenu(!openMenu);
          }}
        >
          <div className="style-switcher-toggler s-icon outer-shadow hover-in-shadow">
            {/* <i className="fas fa-cog fa-spin"></i> */}
            <i className="	fa fa-gear fa-spin"></i>
          </div>
        </div>
        <div className="light-dark-mode">
          <div className="left-content">
            <Brightness4Icon />
          </div>
          <div className="right-content">
            <Switch
              value=""
              checked={checked}
              inputProps={{ "aria-label": "" }}
              size="medium"
              onClick={themeToggler}
            />
          </div>
          <div>
            <LanguageSwitcherSelector></LanguageSwitcherSelector>
          </div>
        </div>
      </div>
    </FloaMenuDiv>
  );
};

const FloaMenuDiv = styled.div`
  .theme {
    position: fixed;
    right: 0;
    top: 50vh;
    transform: translateX(100%);
    z-index: 1001;
  }

  .style-switcher .style-switcher-toggler {
    top: 0;
  }

  .open {
    transform: translateX(1%);
  }

  .style-switcher {
    position: absolute;
    right: 105%;
    top: 0;
    z-index: 101;
    border-radius: 5px;
    transition: all 0.3s ease;

    display: flex;
  }

  .style-switcher .s-icon {
    height: 40px;
    width: 40px;
    text-align: center;
    align-content: center;
    display: grid;
    font-size: 20px;
    color: #ffffff;
    right: 0px;
    margin-right: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 50%;
    background-color: var(--background-light-color-2);
  }

  .hover-in-shadow {
    position: relative;
    z-index: 1;
  }

  .style-switcher .s-icon:after {
    border-radius: 50%;
  }
  .hover-in-shadow:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    transition: all 0.3s ease;
    z-index: -1;
  }

  .outer-shadow {
    box-shadow: 3px 3px 3px #222327, -3px -3px 3px #363636;
  }

  //Floting Toggler
  .light-dark-mode {
    /* position: fixed; */
    right: 0;
    top: 50vh;
    background-color: var(--background-light-color-2);
    width: 7.5rem;
    height: 2.5rem;
    padding-right: 10px;
    z-index: 15;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      display: flex;
      align-items: center;
      font-size: 1.7rem;
      color: var(--white-color);
    }
  }

  @media screen and (max-width: 1024px) {
  }

  @media screen and (max-width: 768px) {
    .light-dark-mode {
      height: 4.5rem;
      width: 8.5rem;
    }
    .style-switcher {
      top: 25px;
    }
  }
`;

export default FloaMenu;
