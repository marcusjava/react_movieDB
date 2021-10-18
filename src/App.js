import React from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movie/:id" component={Detail} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
