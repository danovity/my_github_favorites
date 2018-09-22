import React from "react";

const Item = ({ item, addToFavorites, id, removeFromFavorites }) => {
  console.log("item is, ", item);
  if (item.Add) {
    return (
      <li onClick={addToFavorites} id={id}>
        <a href="">Add</a>
      </li>
    );
  } else if (item.Remove) {
    return (
      <li onClick={removeFromFavorites} id={id}>
        <a href="">Remove</a>
      </li>
    );
  } else if (item.Add === false || item.Remove === false) {
    return <li style={{ opacity: 0 }}>1</li>;
  } else if (item === "1") {
    return <li>-</li>;
  } else if (Array.isArray(item)) {
    return (
      <li>
        <a
          className="repoName"
          target="_blank"
          rel="noopener noreferrer"
          href={item[1]}
        >
          {item[0]}
        </a>
      </li>
    );
  }
  return <li>{item}</li>;
};

export default Item;
