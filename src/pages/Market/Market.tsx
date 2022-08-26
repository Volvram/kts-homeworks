import React from "react";

import { Option } from "@components/Dropdown/Dropdown";

import CoinFilter from "./components/CoinFilter/CoinFilter";
import CoinList from "./components/CoinList/CoinList";
import CurrencyFilter from "./components/CurrencyFilter/CurrencyFilter";
import MarketChange from "./components/MarketChange/MarketChange";

import "./Market.scss";

const Market: React.FC = () => {
  const [coinCurrency, setCoinCurrency] = React.useState<Option>({
    key: "USD",
    value: "$",
  });

  const [coinTrend, setCoinTrend] = React.useState<string>("All");

  const handleCurrencies = (option: Option) => {
    setCoinCurrency(option);
  };

  const handleCoinTrends = (trend: string) => {
    setCoinTrend(trend);
  };

  return (
    <div className="market">
      <MarketChange />
      <CurrencyFilter
        onChange={(option: Option) => {
          handleCurrencies(option);
        }}
      />
      <CoinFilter onChange={(trend: string) => handleCoinTrends(trend)} />
      <hr className="list-line"></hr>
      <CoinList currency={coinCurrency} coinTrend={coinTrend} />
    </div>
  );
};

export default Market;
