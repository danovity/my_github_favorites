import React, { Component } from "react";
import Table from "../../components/Table";

export default class Favorites extends Component {
  render() {
    const { listToBeRendered, removeFromFavorites } = this.props;

    return (
      <div className="favorites">
        <Table
          listToBeRendered={listToBeRendered}
          removeFromFavorites={removeFromFavorites}
        />
      </div>
    );
  }
}
