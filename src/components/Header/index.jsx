import React from "react";
import "./header.css";

const Header = ({ headerData }) => {
  const calcRate = (rate) => {
    return Math.round((1 / rate) * 10000) / 10000;
  };

  return (
    <div className="header">
      <div className="header-inner">
        {headerData &&
          Object.keys({ ...headerData.results }).map((obj, index) => {
            return (
              <p key={index}>
                {`${obj}/${headerData.base}: ${calcRate(
                  { ...headerData.results }[obj]
                )}`}
              </p>
            );
          })}
      </div>
    </div>
  );
};

export default Header;
