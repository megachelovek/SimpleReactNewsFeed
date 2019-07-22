import React from "react";
import { Article } from "./Article";
import { SearchComponent } from "./SearchComponent";

class News extends React.Component {
  constructor(props) {
    super(props);
    this.newsAction = this.newsAction.bind(this);
    this.searchNews = this.searchNews.bind(this);
    this.reboot = this.reboot.bind(this);
  }

  state = {
    news:
      localStorage.getItem("news") &&
      JSON.parse(localStorage.getItem("news")) !== null
        ? JSON.parse(
            localStorage
              .getItem("news")
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/\t/g, "\\t")
          )
        : "",
    oldNews: this.props.data,
    countOfNews: () => {
      if (localStorage.getItem("news") != null) {
        return Array.from(JSON.parse(localStorage.getItem("news"))).length;
      } else {
        return 0;
      }
    }
  };

  newsAction(action, item) {
    if (action !== "edit") {
      this.props.sendActionNews(action, item);
    }
  }

  reboot() {
    this.newsAction("reboot", null);
    localStorage.setItem("item", null);
    this.refreshNews();
  }

  componentDidMount() {
    if (
      localStorage.getItem("item") !== "null" &&
      localStorage.getItem("item") !== null &&
      localStorage.getItem("item") !== "undefined" &&
      localStorage.getItem("item") != null &&
      localStorage.getItem("item") !== ""
    ) {
      window.scrollBy({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }

  //ВЫЗЫВАЕТСЯ ИЗ SearchComponent
  searchNews(searchWord) {
    if (searchWord === "") {
      this.setState({
        news: JSON.parse(localStorage.getItem("news"))
      });
    } else {
      var filteredList = JSON.parse(localStorage.getItem("news")).filter(
        function(item) {
          let mainSearchText =
            item.bigText.toLowerCase() + item.text.toLowerCase();
          return mainSearchText.search(searchWord.toLowerCase()) !== -1;
        }
      );
      this.setState({
        news: filteredList
      });
    }
  }
  refreshNews() {
    if (
      localStorage.getItem("news") !== null ||
      localStorage.getItem("news") !== null ||
      localStorage.getItem("news") !== "null" ||
      localStorage.getItem("news") !== "undefined"
    ) {
      this.setState({
        news: JSON.parse(
          localStorage
            .getItem("news")
            .replace(/\n/g, "\\n")
            .replace(/\r/g, "\\r")
            .replace(/\t/g, "\\t")
        )
      });
    }
  }

  renderNews = () => {
    let newsTemplate = null;
    if (this.state.news != null) {
      if (Array.from(this.state.news).length) {
        newsTemplate = this.state.news.map(function(item) {
          return (
            <Article
              key={item.id}
              data={item}
              getAction={this.newsAction.bind()}
            />
          );
        }, this);
      } else {
        newsTemplate = (
          <div className="loadingBalls">
            <p>Идет загрузка...</p>
            <div className="ball" />
            <div className="ball" />
            <div className="ball" />
            <div className="ball" />
            <div className="ball" />
            <div className="ball" />
            <div className="ball" />
          </div>
        );
      }
    }
    return newsTemplate;
  };

  render() {
    const { news } = this.state;
    return (
      <div className="news">
        <div className="searchAndRebootBlock">
          <SearchComponent getSearch={this.searchNews.bind()} />
          <div id="reboot">
            <a className="fire" onClick={this.reboot.bind()}>
              🔥Сброс🔥
            </a>
          </div>
        </div>
        <div id="mainNewsBlock">
          {this.renderNews()}
          {this.state.news ? (
            <strong className={"news_count"}>
              Всего новостей: {news.length}
            </strong>
          ) : null}{" "}
        </div>
      </div>
    );
  }
}

export { News };
