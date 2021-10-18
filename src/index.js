import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from "./global-styles";
import { BrowserRouter } from "react-router-dom";
import MyMovieProvider from "./context/movie";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <MyMovieProvider>
        <App />
      </MyMovieProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
