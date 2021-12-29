import { Switch as Switching, Route, Redirect } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage";
import ResumePage from "../Pages/ResumePage";
import Portfolios3dPage from "../Pages/Portfolios3dPage";
import PortfoliosPage from "../Pages/PortfoliosPage";
import BlogsPage from "../Pages/BlogsPage";
import ContactPage from "../Pages/ContactPage";

const AppRouter = () => {
  return (
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
      <Route path="/portfolios3d" exact>
        <Portfolios3dPage />
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
      <Redirect to="/404" />
    </Switching>
  );
};

export default AppRouter;
