import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter";
import Header from "./components/Header";

const App = () => {
  const [headerData, setHeaderData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await fetch(
      "https://api.fastforex.io/fetch-multi?from=UAH&to=EUR,USD&api_key=6f851466d1-f1caab4731-rdkes4"
    )
      .then((res) => res.json())
      .then((res) => setHeaderData(res));
  }

  return (
    <div className="App">
      <Header headerData={{ ...headerData }} />
      <CurrencyConverter />
    </div>
  );
};

export default App;
