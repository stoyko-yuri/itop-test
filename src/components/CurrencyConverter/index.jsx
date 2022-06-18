import React, { useState, useEffect } from "react";
import ConverterSide from "./ConverterSide";
import "./currencyConverter.css";

const CurrencyConverter = () => {
  const [allCurrencies, setAllCurrencies] = useState(null);
  const [toggleSide, setToggleSide] = useState(true);
  const [leftCurrencyDefault, setLeftCurrencyDefault] = useState("USD");
  const [rightCurrencyDefault, setRightCurrencyDefault] = useState("UAH");
  const [leftCurrencyCostDefault, setLeftCurrencyCostDefault] = useState(0);
  const [rightCurrencyCostDefault, setRightCurrencyCostDefault] = useState(0);
  const [leftCurrencyCost, setLeftCurrencyCost] = useState(1);
  const [rightCurrencyCost, setRightCurrencyCost] = useState(0);

  let toAmount, fromAmount;
  if (toggleSide) {
    fromAmount = leftCurrencyCost;
    toAmount =
      Math.round(leftCurrencyCost * rightCurrencyCostDefault * 10000) / 10000;
  } else {
    toAmount = rightCurrencyCost;
    fromAmount =
      Math.round(rightCurrencyCost * leftCurrencyCostDefault * 10000) / 10000;
  }

  useEffect(() => {
    async function fetchData() {
      await fetch(
        "https://api.fastforex.io/currencies?api_key=6f851466d1-f1caab4731-rdkes4"
      )
        .then((res) => res.json())
        .then((res) => {
          setAllCurrencies({ ...res.currencies });
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    fetch(
      `https://api.fastforex.io//fetch-one?from=${leftCurrencyDefault}&to=${rightCurrencyDefault}&api_key=6f851466d1-f1caab4731-rdkes4`
    )
      .then((res) => res.json())
      .then((res) => {
        setRightCurrencyCostDefault(Object.values({ ...res.result })[0]);
      });
    fetch(
      `https://api.fastforex.io//fetch-one?from=${rightCurrencyDefault}&to=${leftCurrencyDefault}&api_key=6f851466d1-f1caab4731-rdkes4`
    )
      .then((res) => res.json())
      .then((res) => {
        setLeftCurrencyCostDefault(Object.values({ ...res.result })[0]);
      });
  }, [leftCurrencyDefault, rightCurrencyDefault]);

  useEffect(() => {
    if (toggleSide) setRightCurrencyCost(1);
    else setLeftCurrencyCost(1);
  }, [toggleSide]);

  const onChangeLeftInput = (eventItem) => {
    if (eventItem >= 0) {
      setLeftCurrencyCost(eventItem);
    } else {
      setLeftCurrencyCost(0);
    }
  };

  const onChangeRightInput = (eventItem) => {
    if (eventItem >= 0) {
      setRightCurrencyCost(eventItem);
    } else {
      setRightCurrencyCost(0);
    }
  };

  return (
    <div className="currency_converter">
      <div className="currency_converter-inner">
        <div className="currency_converter-headline">Converter</div>
        <div className="currency_converter-calculator">
          <div className="currency_converter-left">
            <ConverterSide
              sideName="left"
              changeInput={onChangeLeftInput}
              changeCurrency={setLeftCurrencyDefault}
              changeSide={setToggleSide}
              defaultCurrency={leftCurrencyDefault}
              currencyCost={fromAmount}
              currencies={allCurrencies}
            />
          </div>
          <p className="currency_converter-equals">=</p>
          <div className="currency_converter-rigth">
            <ConverterSide
              sideName="right"
              changeInput={onChangeRightInput}
              changeCurrency={setRightCurrencyDefault}
              changeSide={setToggleSide}
              defaultCurrency={rightCurrencyDefault}
              currencyCost={toAmount}
              currencies={allCurrencies}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
