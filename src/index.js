import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyles } from "./global-styles";
import { BrowserRouter } from "react-router-dom";
import MovieProvider from "./context/movie";
import FirebaseProvider from "./context/firebase";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <MovieProvider>
        <App />
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
