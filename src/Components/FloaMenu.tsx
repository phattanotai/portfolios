import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import LanguageSwitcherSelector from "./LanguageSwitcherSelector";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Switch from "@material-ui/core/Switch";
import { useDispatch, useSelector } from "react-redux";
import { setLangAsync, setLang } from "../redux-thunk/actions/langAction";

const FloaMenu: FC = () => {
  const [checked, setChecked] = useState<boolean>(
    localStorage.getItem("theme") === "light-theme" ? true : false
  );
  const [checkedLang, setCheckedLang] = useState<boolean>(
    localStorage.getItem("theme") === "light-theme" ? true : false
  );

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme")
      ? String(localStorage.getItem("theme"))
      : "dark-theme"
  );

  // state manament redux
  const dispatch = useDispatch();
  const langType = useSelector((state: any) => state.lang);

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

  // state manament context api
  // const { langType, setLangType } = useContext(LangContext);

  const langToggler = () => {
    // if (langType === "EN") {
    //   setLangType("TH");
    //   setCheckedLang(false);
    // } else {
    //   setLangType("EN");
    //   setCheckedLang(true);
    // }

    if (langType === "EN") {
      dispatch(setLangAsync("TH"));
      setCheckedLang(false);
    } else {
      dispatch(setLangAsync("EN"));
      setCheckedLang(true);
    }
  };

  return (
    <FloaMenuDiv>
      <div className="theme">
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
          <LanguageSwitcherSelector></LanguageSwitcherSelector>
        </div>
      </div>
    </FloaMenuDiv>
  );
};

const FloaMenuDiv = styled.div`
  //Floting Toggler
  .light-dark-mode {
    position: fixed;
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
    .light-dark-mode {
      height: 5.5rem;
      width: 9.5rem;
    }
  }

  @media screen and (max-width: 768px) {
    .light-dark-mode {
      height: 4.5rem;
      width: 8.5rem;
    }
  }
`;

export default FloaMenu;
