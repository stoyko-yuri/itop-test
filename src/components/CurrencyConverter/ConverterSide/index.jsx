import React from "react";
import "./converterSide.css";

const ConverterSide = ({
  sideName,
  changeInput,
  changeCurrency,
  changeSide,
  defaultCurrency,
  currencyCost,
  currencies,
}) => {
  return (
    <form className="converter_side">
      <input
        type="number"
        value={currencyCost}
        onChange={(e) => {
          if (sideName === "left") changeSide(true);
          else changeSide(false);
          changeInput(e.target.value);
        }}
        onClick={() => {
          if (sideName === "left") changeSide(true);
          else changeSide(false);
        }}
      />
      <select
        onChange={(e) => {
          if (sideName === "left") changeSide(true);
          else changeSide(false);
          changeCurrency(e.target.value);
        }}
        value={defaultCurrency}
      >
        {Object.keys({ ...currencies }).map((obj, index) => {
          return obj === defaultCurrency ? (
            <option key={index} value={obj}>
              {obj}
            </option>
          ) : (
            <option key={index} value={obj}>
              {obj}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default ConverterSide;
