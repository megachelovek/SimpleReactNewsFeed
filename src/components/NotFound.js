import React from "react";
import { NavLink } from "react-router-dom";

class NotFound extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Error404">
          <h2>Страница не найдена</h2>
          <section className="error-container">
            <span>4</span>
            <span>
              <span className="screen-reader-text">0</span>
            </span>
            <span>4</span>
          </section>
          <NavLink className="navLink" exact to="/">
            Вернуться на главную
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}

export { NotFound };
