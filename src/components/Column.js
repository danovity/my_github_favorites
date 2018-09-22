import React from "react";
import ListHeader from "./ListHeader";
import Item from "./Item";

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
