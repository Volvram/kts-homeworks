import React from "react";

import { Option } from "@components/Dropdown/Dropdown";

import CoinList from "./components/CoinList/CoinList";
import CurrencyFilter from "./components/CurrencyFilter/CurrencyFilter";
import MarketChange from "./components/MarketChange/MarketChange";

import "./Market.scss";

const Market: React.FC = () => {
  const [coinCurrency, setCoinCurrency] = React.useState<Option>({
    key: "USD",
    value: "$",
  });

  const handleOptions = (option: Option) => {
    setCoinCurrency(option);
  };

  return (
    <div className="market">
      <MarketChange />
      <CurrencyFilter
        onChange={(option: Option) => {
          handleOptions(option);
        }}
      />
      <hr className="list-hr"></hr>
      <CoinList currency={coinCurrency} />
    </div>
  );
};

export default Market;
