import React, { createContext, useContext } from "react";

import { Option } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";

import CoinFilter from "./components/CoinFilter/CoinFilter";
import CoinList from "./components/CoinList/CoinList";
import CurrencyFilter from "./components/CurrencyFilter/CurrencyFilter";
import MarketChange from "./components/MarketChange/MarketChange";
import MarketSearch from "./components/MarketSearch/MarketSearch";
import styleMarket from "./Market.module.scss";

const OpenSearch = createContext({
  openSearch: false,
  setSearch: (value: boolean) => {},
});
const OpenSearchProvider = OpenSearch.Provider;
export const useOpenSearchContext = () => useContext(OpenSearch);

type MarketProps = {
  onCurrencyChange: (value: Option) => void;
};

const Market: React.FC<MarketProps> = ({ onCurrencyChange }) => {
  const [openSearch, setSearch] = React.useState<boolean>(false);

  const [coinCurrency, setCoinCurrency] = React.useState<Option | null>(null);

  const [coinTrend, setCoinTrend] = React.useState<string>("All");

  React.useEffect(() => {
    const savedCurrency: string | null =
      window.localStorage.getItem("currency");

    if (typeof savedCurrency === "string") {
      setCoinCurrency(JSON.parse(savedCurrency));
      onCurrencyChange(JSON.parse(savedCurrency));
    } else {
      setCoinCurrency(CURRENCIES[0]);
      onCurrencyChange(CURRENCIES[0]);
    }
    return () => {
      setTimeout(() => {
        window.localStorage.clear();
      }, 90000);
    };
  }, []);

  const handleCurrencies = (currency: Option) => {
    setCoinCurrency(currency);
    window.localStorage.setItem("currency", JSON.stringify(currency));
    onCurrencyChange(currency);
  };

  const handleCoinTrends = React.useCallback(
    (trend: string) => setCoinTrend(trend),
    []
  );

  return (
    <div className={styleMarket.market}>
      {!openSearch && (
        <OpenSearchProvider value={{ openSearch, setSearch }}>
          <MarketChange currency={coinCurrency} />
          <CurrencyFilter
            onChange={(currency: Option) => {
              handleCurrencies(currency);
            }}
            defaultCurrency={coinCurrency}
          />
          <CoinFilter onChange={(trend: string) => handleCoinTrends(trend)} />
          <hr className={styleMarket.listLine}></hr>
        </OpenSearchProvider>
      )}

      {openSearch && (
        <OpenSearchProvider value={{ openSearch, setSearch }}>
          <MarketSearch />
        </OpenSearchProvider>
      )}
      <CoinList currency={coinCurrency} coinTrend={coinTrend} />
    </div>
  );
};

export default Market;
