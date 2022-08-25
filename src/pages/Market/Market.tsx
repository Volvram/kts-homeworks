import React from "react";

import CoinList from "./components/CoinList/CoinList";
import MarketChange from "./components/MarketChange/MarketChange";

import "./Market.scss";

const Market: React.FC = () => {
  return (
    <div className="market">
      <MarketChange />
      <hr className="list-hr"></hr>
      <CoinList />
    </div>
  );
};

export default Market;
