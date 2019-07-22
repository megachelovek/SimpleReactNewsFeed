import React from "react";
import PropTypes from "prop-types";

import { Article } from "./Article.js";

var Comments = () => {
  return <p>Тут комментарии</p>;
};

class News extends React.Component {
  state = {
    filteredNews: this.props.data
  };
  static getDerivedStateFromProps(props, state) {
    console.log(props);
    console.log(state);
    return { filteredNews: props.data };
  }

  // componentWillReceiveProps(nextProps) {
  //   let nextFilteredNews = [...nextProps.data];
  //   nextFilteredNews.forEach((item, index) => {
  //     if (item.bigText.toLowerCase().indexOf("pubg") !== -1) {
  //       item.bigText = "В ТЕКСТЕ ПРИСУТСТВУЮТ СТОП СЛОВА";
  //     }
  //   });
  //   this.setState({ filteredNews: nextFilteredNews });
  // }

  renderNews = () => {
    const { filteredNews } = this.state;
    let newsTemplate = null;
    if (filteredNews.length) {
      newsTemplate = filteredNews.map(function(item) {
        return <Article key={item.id} data={item} />;
      });
    } else {
      newsTemplate = <p>К сожалению новостей нет</p>;
    }
    return newsTemplate;
  };
  render() {
    const { filteredNews } = this.state;

    return (
      <div className="news">
        {this.renderNews()}
        <div className={filteredNews.length > 0 ? "" : "none"}>
          <strong>Всего новостей: {filteredNews.length}</strong>
          <Comments />
        </div>
      </div>
    );
  }
}
News.propTypes = { data: PropTypes.array.isRequired };

export { News };
