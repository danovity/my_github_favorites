import React from "react";

const ListHeader = ({ headerName }) => {
  let opacityValue;

  if (headerName === "empty") {
    opacityValue = 0;
  } else {
    opacityValue = 100;
  }

  return (
    <h5 className="header__quinary" style={{ opacity: opacityValue }}>
      {headerName}
    </h5>
  );
};

export default ListHeader;
