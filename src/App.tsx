import { useState, useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Components/Sidebar";
import styled from "styled-components";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ResumePage from "./Pages/ResumePage";
import PortfoliosPage from "./Pages/PortfoliosPage";
import BlogsPage from "./Pages/BlogsPage";
import ContactPage from "./Pages/ContactPage";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import MenuIcon from "@material-ui/icons/Menu";
import { Route, Switch as Switching } from "react-router";
import Switch from "@material-ui/core/Switch";
import { IconButton } from "@material-ui/core";

// import LangContext from "./contexts/LangContext";
import { setLangAsync, setLang } from "./redux-thunk/actions/langAction";
import LanguageSwitcherSelector from "./Components/LanguageSwitcherSelector";

function App() {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme")
      ? String(localStorage.getItem("theme"))
      : "dark-theme"
  );
  const [checked, setChecked] = useState<boolean>(
    localStorage.getItem("theme") === "light-theme" ? true : false
  );
  const [checkedLang, setCheckedLang] = useState<boolean>(
    localStorage.getItem("theme") === "light-theme" ? true : false
  );
  const [navToggle, setNavToggle] = useState<boolean>(false);

  // state manament redux
  const dispatch = useDispatch();
  const langType = useSelector((state: any) => state.lang);

  // state manament context api
  // const { langType, setLangType } = useContext(LangContext);

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
    <div className="App">
      <Sidebar navToggle={navToggle} />
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
        </div>
      </div>
      <div className="theme">
        <div className="en-th-mode">
          <LanguageSwitcherSelector></LanguageSwitcherSelector>
        </div>
      </div>

      <div className="ham-burger-menu">
        <IconButton onClick={() => setNavToggle(!navToggle)}>
          <MenuIcon />
        </IconButton>
      </div>

      <MainContentStyled>
        <div className="lines">
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
          <div className="line-4"></div>
        </div>

        <Switching>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/about" exact>
            <AboutPage />
          </Route>
          <Route path="/resume" exact>
            <ResumePage />
          </Route>
          <Route path="/portfolios" exact>
            <PortfoliosPage />
          </Route>
          <Route path="/blogs" exact>
            <BlogsPage />
          </Route>
          <Route path="/contact" exact>
            <ContactPage />
          </Route>
        </Switching>
      </MainContentStyled>
    </div>
  );
}

const MainContentStyled = styled.main`
  position: relative;
  margin-left: 16.3rem;
  min-height: 100vh;
  @media screen and (max-width: 1200px) {
    margin-left: 0;
  }
  .lines {
    position: absolute;
    min-height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    opacity: 0.4;
    z-index: -1;
    .line-1,
    .line-2,
    .line-3,
    .line-4 {
      width: 1px;
      min-height: 100vh;
      background-color: var(--border-color);
    }
  }
`;

export default App;
