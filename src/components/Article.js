import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ReactDOM from "react-dom";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.createAction = this.createAction.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.bigTextBlock = React.createRef();
  }
  state = { visible: false, action: "" };
  handleReadMoreClick = e => {
    e.preventDefault();
    // var element = ReactDOM.findDOMNode(this.bigTextBlock);
    // element.setAttribute("class", "active");
    this.setState({ visible: !this.state.visible });
  };
  editItem() {
    localStorage.setItem("item", JSON.stringify(this.props.data));
    this.createAction("edit", this.props.data);
  }
  deleteItem() {
    this.createAction("delete", this.props.data);
  }

  createAction = (action, item) => {
    this.props.getAction(action, item);
  };
  toHtmlBlockJson = jsonText => {
    return;
  };
  render() {
    const { author, text, bigText, date, title } = this.props.data;
    const { visible } = this.state;
    return (
      <div id="newsBlock">
        <div id="tools">
          <h3>{title}</h3>
          <div className="editTools">
            <a id="edit_news" href=" " onClick={this.editItem.bind()}>
              <img src="img/edit.png" alt="Edit" width="20px" />
            </a>
            <a id="delete_news" href=" " onClick={this.deleteItem.bind()}>
              <img src="img/delete.png" alt="Delete" width="20px" />
            </a>
          </div>
        </div>
        <div className="userBlock">
          <img src="img/user.png" alt="User" width="20px" />
          <p id="authorBlock" className="news_Author">
            {author}
          </p>
        </div>
        <div className="descriptionBlock">
          <div id="newsText" className="news_Text">
            <div
              dangerouslySetInnerHTML={{
                __html: text.replace(/\n/g, "<br/>")
              }}
            />
          </div>
        </div>
        {!visible && (
          <a
            id="more"
            onClick={this.handleReadMoreClick}
            href=" "
            className="news_readmore"
          >
            Подробнее
          </a>
        )}{" "}
        <div className="mainText">
          <div
            ref={this.bigTextBlock}
            id="bigTextBlock"
            className={
              visible ? "news_big-text active" : "news_big-text notactive"
            }
            dangerouslySetInnerHTML={{
              __html: bigText.replace(/\n/g, "<br/>")
            }}
          />
          {visible && (
            <a
              id="more"
              onClick={this.handleReadMoreClick}
              href=" "
              className="news_readmore"
            >
              Скрыть
            </a>
          )}
        </div>
        <div className="dateBlock">
          <p>
            Дата публикации:
            {"  " +
              moment(new Date(date.toString()), "DD-MM-YYYY HH:mm", true)
                .format("DD-MM-YYYY в HH:mm")
                .toString()}
          </p>
        </div>
      </div>
    );
  }
}
Article.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    bigText: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
};

export { Article };
