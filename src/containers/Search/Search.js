import React, { Component } from "react";
import Table from "../../components/Table";

export default class Search extends Component {
  render() {
    const {
      listToBeRendered,
      submitQuery,
      queryListener,
      addToFavorites
    } = this.props;

    return (
      <div className="search">
        <div className="search__search-control">
          <input
            className="search__search-input"
            type="text"
            onChange={queryListener}
          />
          <div className="search__search-button" onClick={submitQuery}>
            Search
          </div>
        </div>
        <Table
          listToBeRendered={listToBeRendered}
          addToFavorites={addToFavorites}
        />
      </div>
    );
  }
}
