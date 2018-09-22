import React from "react";
import ListHeader from "./ListHeader";
import Item from "./Item";
const uuidv1 = require("uuid/v1");

const Column = ({
  headerName,
  columnContent,
  addToFavorites,
  removeFromFavorites
}) => {
  const renderListItem = columnContent.map((item, i) => {
    return (
      <Item
        item={item}
        id={i}
        addToFavorites={addToFavorites}
        removeFromFavorites={removeFromFavorites}
        key={uuidv1()}
      />
    );
  });

  return (
    <div className="table__column">
      <ListHeader headerName={headerName} />
      <ul>{renderListItem}</ul>
    </div>
  );
};

export default Column;
