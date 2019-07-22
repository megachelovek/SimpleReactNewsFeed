import React from "react";

class SearchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.startSearch = this.startSearch.bind(this);
  }
  changeSearchQuery = e => {
    this.setState({ value: e.target.value });
  };
  startSearch = () => {
    this.props.getSearch(this.state.value);
  };
  render() {
    return (
      <div id="searchBlock">
        <input
          className="searchTerm"
          placeholder="Ваш запрос"
          onChange={e => this.changeSearchQuery(e)}
        />
        <button className="searchButton" onClick={this.startSearch.bind()}>
          Поиск
        </button>
      </div>
    );
  }
}

export { SearchComponent };
