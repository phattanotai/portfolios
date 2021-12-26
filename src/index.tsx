import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from "./styles/GlobalStyle";
import { Provider } from "react-redux";

import store from "./redux-thunk/configStore";
// import ContextProvider from "./contexts";

ReactDOM.render(
  <React.StrictMode>
    {/* <ContextProvider> */}
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    {/* </ContextProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
