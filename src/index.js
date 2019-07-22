import React from "react";
import ReactDOM from "react-dom";
import { Router, Switch, Route, BrowserRouter } from "react-router-dom";

import { AppNews } from "./components/AppNews.js";
import { Rules } from "./components/Rules.js";
import { NotFound } from "./components/NotFound.js";
import "./styles.css";

class App extends React.Component {
  render() {
    return (
      <div className="mainComponent">
        <AppNews />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/rules" component={Rules} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>,
  rootElement
);
