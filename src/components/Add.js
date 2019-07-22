import React from "react";
import { NavLink } from "react-router-dom";

class Add extends React.Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem("item") === null) {
      localStorage.setItem("item", "");
    }
    this.checkRules = React.createRef();
  }
  state = {
    author:
      localStorage.getItem("item") &&
      JSON.parse(localStorage.getItem("item")) !== null
        ? JSON.parse(localStorage.getItem("item")).author
        : "",
    text:
      localStorage.getItem("item") &&
      JSON.parse(localStorage.getItem("item")) !== null
        ? JSON.parse(localStorage.getItem("item")).text
        : "",
    id:
      localStorage.getItem("item") &&
      JSON.parse(localStorage.getItem("item")) !== null
        ? JSON.parse(localStorage.getItem("item")).id
        : "",
    bigText:
      localStorage.getItem("item") &&
      JSON.parse(localStorage.getItem("item")) !== null
        ? JSON.parse(localStorage.getItem("item")).bigText
        : "",
    title:
      localStorage.getItem("item") &&
      JSON.parse(localStorage.getItem("item")) !== null
        ? JSON.parse(localStorage.getItem("item")).title
        : "",
    date:
      localStorage.getItem("item") &&
      JSON.parse(localStorage.getItem("item")) !== null
        ? JSON.parse(localStorage.getItem("item")).date
        : "",
    checkBoxRules: false
  };

  handleAuthorChange = e => {
    this.setState({ author: e.target.value });
  };
  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };
  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleBigTextChange = e => {
    this.setState({ bigText: e.target.value });
  };
  onCheckRulesHandler = e => {
    this.setState({ checkBoxRules: e.currentTarget.checked });
  };

  onBtnClickHandler = e => {
    e.preventDefault();
    const { id, author, text, bigText, title, date } = this.state;
    var newDate =
      date === null || date === "null" || date === ""
        ? new Date().toJSON()
        : date;
    var item = {
      id: id,
      author: author,
      text: text,
      bigText: bigText,
      title: title,
      date: newDate
    };
    localStorage.setItem("item", JSON.stringify(item));
    this.props.sendActionNews("update", null);
    this.setState({
      author: "",
      text: "",
      bigText: "",
      title: "",
      date: "",
      checkBoxRules: false
    });
  };

  validate = () => {
    if (this.state.author !== null && this.state.text !== null) {
      let authorValidate = this.state.author.trim();
      let authorText = this.state.text.trim();
      let authorBigText = this.state.bigText.trim();
      let titleValidate = this.state.title.trim();
      if (
        titleValidate !== "" &&
        authorValidate !== "" &&
        authorText !== "" &&
        authorBigText !== "" &&
        this.state.checkBoxRules
      ) {
        return false;
      } else {
        return true;
      }
    }
  };

  render() {
    return (
      <form className="add" id="addForm" ref="AddNewsComponent">
        <img src="img/user.png" alt="User" width="20px" /> <p>Автор</p>
        <input
          type="text"
          id="author"
          onChange={this.handleAuthorChange}
          ref={this.addAuthor}
          className="add_author"
          placeholder="Ваше имя"
          value={this.state.author}
        />
        <p>Заголовок</p>
        <input
          type="text"
          id="title"
          onChange={this.handleTitleChange}
          ref={this.addTitle}
          className="add_title"
          placeholder="Ваш заголовок новости"
          value={this.state.title}
        />
        <p>Описание</p>
        <textarea
          id="text"
          className="add_text"
          onChange={this.handleTextChange}
          ref={this.addText}
          placeholder="Текст	новости"
          value={this.state.text}
        />
        <p>Основной текст</p>
        <textarea
          id="bigText"
          onChange={this.handleBigTextChange}
          className="add_bigText"
          placeholder="Текст	новости	подробно"
          value={this.state.bigText}
        />
        <label className="add_checkrule">
          <input
            id="checkRules"
            ref={this.checkRules}
            checked={this.state.checkBoxRules}
            onChange={this.onCheckRulesHandler}
            type="checkbox"
          />
          Я согласен с правилами
        </label>
        <NavLink className="navLink" exact to="/rules">
          {">Правила<"}
        </NavLink>
        <button
          className="add_btn"
          disabled={this.validate()}
          onClick={this.onBtnClickHandler}
        >
          Добавить новость
        </button>
      </form>
    );
  }
}

export { Add };
