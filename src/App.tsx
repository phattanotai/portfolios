import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Components/Sidebar";
import styled from "styled-components";
import { useLocation, Route } from "react-router-dom";
// import LangContext from "./contexts/LangContext";
import { openNav } from "./redux-thunk/actions/navAction";
import PreLoader from "./Components/PreLoader";
import AppRouter from "./Components/AppRoute";
import NotFound from "./Pages/NotFound";
import HamMenu from "./Components/HamMenu";
import FloaMenu from "./Components/FloaMenu";

const AppLine = () => {
  return (
    <div className="lines">
      <div className="line-1"></div>
      <div className="line-2"></div>
      <div className="line-3"></div>
      <div className="line-4"></div>
    </div>
  );
};

const AppChildren = () => {
  const location = useLocation();
  // state manament redux
  const dispatch = useDispatch();
  const navToggle = useSelector((state: any) => state.nav);

  if (location.pathname === "/404") {
    return (
      <div>
        <Route path="/404" component={NotFound} exact />
      </div>
    );
  }
  return (
    <>
      <Sidebar navToggle={navToggle} />
      <HamMenu />
      <FloaMenu />
      <MainContentStyled onClick={() => dispatch(openNav(false))}>
        <AppLine></AppLine>
        <AppRouter></AppRouter>
      </MainContentStyled>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <PreLoader>
        <AppChildren></AppChildren>
      </PreLoader>
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
