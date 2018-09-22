import React from "react";
import Column from "./Column";

const uuidv1 = require("uuid/v1");

const Table = ({ listToBeRendered, addToFavorites, removeFromFavorites }) => {
  let headerNames = ["Name", "Language", "Latest Tag", "empty"];

  let sortedObject = {
    name: [],
    language: [],
    latestTag: [],
    button: []
  };

  const sortedObjectKeys = Object.keys(sortedObject);

  const constructSortedObject = () => {
    Object.keys(listToBeRendered).forEach(key => {
      sortedObject.name.push(listToBeRendered[key].Name);
      sortedObject.language.push(listToBeRendered[key].Language);
      sortedObject.latestTag.push(listToBeRendered[key].LatestTag);
      sortedObject.button.push(listToBeRendered[key].Button);
    });
  };

  constructSortedObject();

  const renderColumns = headerNames.map((headerName, i) => {
    return (
      <Column
        headerName={headerName}
        columnContent={sortedObject[sortedObjectKeys[i]]}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        key={uuidv1()}
      />
    );
  });

  return <div className="table">{renderColumns}</div>;
};

export default Table;
