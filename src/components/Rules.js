import React from "react";
import { NavLink } from "react-router-dom";

class Rules extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="rulesBlock">
          <div id="tools">
            <h3>Правила размещения новостей</h3>
            <div className="editTools" />
          </div>
          <div className="mainText">
            <div id="bigTextBlock" className="news_big-text active" />
            <ul>
              <li>Запрещено использование слова "xxx"</li>
              <li>Запрещено использование слова "123"</li>
              <li>Запрещено использование слова "Алкоголь"</li>
              <li>Запрещено использование слова "Сигареты"</li>
            </ul>
            <p>Все тексты, использующие эти слова будут скрыты!</p>
          </div>
          <NavLink className="navLink" exact to="/">
            Вернуться на главную
          </NavLink>
        </div>
      </React.Fragment>
    );
  }
}

export { Rules };
