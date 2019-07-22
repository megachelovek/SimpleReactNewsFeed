import React from "react";

import { News } from "./News.js";
import { Add } from "./Add";
import { Items } from "./Items.js";

//TODO rules(Routes)
class AppNews extends React.Component {
  constructor(props) {
    super(props);
    this.getDataFromItemsComponent = this.getDataFromItemsComponent.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.itemsNews = React.createRef();
    this.newsComponent = React.createRef();
    this.AddNewsComponent = React.createRef();
  }

  changeItem(action, item) {
    this.itemsNews.current.changeItem(action, item);
  }

  //Не трогай, isLoading особенно, он отвечает за обновление!
  getDataFromItemsComponent() {
    setTimeout(() => {
      var localStorageNews = localStorage.getItem("news");
      if (
        (this.newsComponent.current != null &&
          (localStorageNews === "null" || localStorageNews === null)) ||
        localStorageNews === "undefined"
      ) {
        this.newsComponent.current.reboot();
      } else {
        if (localStorage.getItem("isLoading") === null) {
          localStorage.setItem("isLoading", false);
          this.newsComponent.current.reboot();
        }
        if (localStorageNews !== localStorage.getItem("oldNews")) {
          this.newsComponent.current.refreshNews();
        }
      }
    }, 1000);
  }

  render() {
    return (
      <React.Fragment>
        <Items
          ref={this.itemsNews}
          newsItems={this.getDataFromItemsComponent}
        />
        <div className="headernews">
          <h1>Новостная лента</h1>
        </div>
        <News sendActionNews={this.changeItem} ref={this.newsComponent} />
        <Add sendActionNews={this.changeItem} ref="AddNewsComponent" />
      </React.Fragment>
    );
  }
}

export { AppNews };
