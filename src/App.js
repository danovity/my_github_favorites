import React, { Component } from "react";
import Favorites from "./containers/Favorites/Favorites";
import Search from "./containers/Search/Search";
import axios from "axios";

var _ = require("lodash/core");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      search: {},
      favorites: {}
    };
    this.submitQuery = this.submitQuery.bind(this);
    this.queryListener = this.queryListener.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }

  submitQuery = e => {
    this.setState({ search: [] });
    //Send GraphQL Query
    axios({
      url: "https://api.github.com/graphql",
      method: "post",
      headers: {
        Authorization: "Bearer 527dd68d220dc99220a412f4cc97bd1fbe16ca29"
      },
      data: {
        query: `{
          search(query: ${this.state.query}, type: REPOSITORY, first: 10) {
            repositoryCount
            edges {
              node {
                ... on Repository {
                  nameWithOwner
                  languages(first:1) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                  releases(first:1) {
                    edges {
                      node {
                        name
                      }
                    }
                  }
                  url
                }
              }
            }
          }}`
      }
    }).then(result => {
      const queryResults = result.data.data.search.edges;

      queryResults.forEach((cur, i) => {
        let length = Object.keys(this.state.search).length;

        const currentSearchState = { ...this.state.search };

        let latestTag =
          cur.node.releases.edges[0] !== undefined
            ? cur.node.releases.edges[0].node.name
            : "1";

        if (latestTag !== "1") {
          var releaseTagVersion = latestTag.match(/(\d+\.){1,2}\d+/g);
          if (releaseTagVersion !== null) {
            latestTag = "v" + releaseTagVersion;
          } else {
            latestTag = "1";
          }
        }

        let newSearchState = {
          ...currentSearchState,
          [length]: {
            Name: [cur.node.nameWithOwner, cur.node.url],
            Language: cur.node.languages.edges[0].node.name,
            LatestTag: latestTag,
            Button: { Add: true }
          }
        };

        let updatedFavorites = { ...this.state.favorites };

        Object.keys(updatedFavorites).forEach((key, i) => {
          let oneOfFavoritesItemName = updatedFavorites[key].Name[0];
          Object.keys(newSearchState).forEach((keyTwo, index) => {
            if (newSearchState[keyTwo].Name[0] === oneOfFavoritesItemName) {
              newSearchState[keyTwo].Button.Add = false;
            }
          });
        });

        this.setState({ search: newSearchState });
      });
    });
  };

  queryListener = e => {
    if (e.target.value === "") {
      this.setState({ search: [] });
    }

    this.setState({ query: e.target.value });
  };

  addToFavorites = e => {
    e.preventDefault();

    let currentSearchState = { ...this.state.search };
    currentSearchState[e.currentTarget.id].Button.Add = false;
    let updatedSearchState = currentSearchState;
    this.setState({ search: updatedSearchState });

    let length = Object.keys(this.state.favorites).length;
    let newFavoriteItem = _.clone(this.state.search[e.currentTarget.id]);

    const currentFavorites = { ...this.state.favorites };

    newFavoriteItem.Button = { Remove: true };
    let updatedFavorites = {
      ...currentFavorites,
      [length]: newFavoriteItem
    };

    this.setState({ favorites: updatedFavorites });
  };

  removeFromFavorites = e => {
    e.preventDefault();
    let updatedFavorites = { ...this.state.favorites };

    let updatedFavoritesItemName = updatedFavorites[e.currentTarget.id].Name[0];

    delete updatedFavorites[e.currentTarget.id];

    let currentSearchState = { ...this.state.search };

    Object.keys(currentSearchState).forEach((key, i) => {
      if (currentSearchState[key].Name[0] === updatedFavoritesItemName) {
        currentSearchState[key].Button.Add = true;
      }
    });

    let updatedSearchState = currentSearchState;
    this.setState({ search: updatedSearchState });

    let finalUpdatedFavorites = {};

    Object.keys(updatedFavorites).forEach((key, i) => {
      finalUpdatedFavorites[i] = updatedFavorites[key];
    });

    this.setState({ favorites: finalUpdatedFavorites });
  };

  render() {
    return (
      <section className="content">
        <Search
          listToBeRendered={this.state.search}
          submitQuery={this.submitQuery}
          queryListener={this.queryListener}
          addToFavorites={this.addToFavorites}
        />
        <Favorites
          listToBeRendered={this.state.favorites}
          removeFromFavorites={this.removeFromFavorites}
        />
      </section>
    );
  }
}

export default App;
