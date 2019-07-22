import React, { Component } from "react";

class Items extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: null,
      filteredNews: null
    };
    this.getItems();
  }

  render() {
    return <div />;
  }

  changeItem(action, itemNews) {
    switch (action) {
      case "reboot":
        localStorage.setItem("news", localStorage.getItem("oldNews"));
        this.getItems();
        break;
      case "getItems":
        this.getItems();
        break;
      case "update":
        this.updateItem(itemNews);
        break;
      case "delete":
        this.deleteItem(itemNews);
        break;
      default:
        break;
    }
  }

  getItems() {
    if (
      localStorage.getItem("news") === null ||
      localStorage.getItem("news") == null ||
      localStorage.getItem("news") === "null" ||
      localStorage.getItem("news") === "undefined"
    ) {
      fetch("https://12x87.codesandbox.io/news.json")
        .then(response => {
          return response.json();
        })
        .then(data => {
          localStorage.setItem("news", JSON.stringify(data));
          localStorage.setItem("oldNews", JSON.stringify(data));
          this.filter();
          this.props.newsItems();
        });
    } else {
      this.props.newsItems();
    }
  }

  updateItem(item) {
    item = JSON.parse(localStorage.getItem("item"));
    if (item.id === "") {
      this.createItem(item);
    }
    var currentData = Array.from(JSON.parse(localStorage.getItem("news")));
    for (var i in currentData) {
      if (currentData[i].id === item.id) {
        currentData[i] = item;
        localStorage.setItem("item", null);
        localStorage.setItem("news", JSON.stringify(currentData));
        this.filter();
        break;
      }
    }
  }

  createItem(newItem) {
    var news = JSON.parse(localStorage.getItem("news"));
    newItem.id =
      Math.max.apply(
        Math,
        news.map(function(o) {
          return o.id;
        })
      ) + 1;
    const nextNews = [newItem, ...news];
    localStorage.setItem("news", JSON.stringify(nextNews));
    this.filter();
  }

  filter() {
    let nextFilteredNews = JSON.parse(localStorage.getItem("news"));
    nextFilteredNews.forEach(item => {
      if (
        item.bigText.toLowerCase().indexOf("сигареты") !== -1 ||
        item.bigText.toLowerCase().indexOf("123") !== -1 ||
        item.bigText.toLowerCase().indexOf("xxx") !== -1 ||
        item.bigText.toLowerCase().indexOf("алкоголь") !== -1
      ) {
        item.author = item.author + " ( Текст этого автора был заблокирован ) ";
        item.bigText =
          "Текст содержит запрещенные слова, его содержание было скрыто. Для публикации текста необходимо ознакомиться с правилами.";
        item.text = "В тексте содержатся стоп слова!";
        localStorage.setItem("news", JSON.stringify(nextFilteredNews));
        localStorage.setItem("oldNews", JSON.stringify(nextFilteredNews));
      }
    });
    this.getItems();
  }

  deleteItem(item) {
    var currentData = Array.from(JSON.parse(localStorage.getItem("news")));
    for (var i in currentData) {
      if (currentData[i].id === item.id) {
        currentData.splice(i, 1);
        localStorage.setItem("news", JSON.stringify(currentData));
        this.getItems();
        break;
      }
    }
  }
}

export { Items };
