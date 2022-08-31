import React, { createContext, useContext } from "react";

import { Option } from "@components/Dropdown/Dropdown";
import { CURRENCIES } from "@config/currencies";
import MarketStore from "@store/MarketStore/MarketStore";
import { useLocalStore } from "@utils/useLocalStore";

import CoinFilter from "./components/CoinFilter/CoinFilter";
import CoinList from "./components/CoinList/CoinList";
import CurrencyFilter from "./components/CurrencyFilter/CurrencyFilter";
import MarketChange from "./components/MarketChange/MarketChange";
import MarketSearch from "./components/MarketSearch/MarketSearch";
import styleMarket from "./Market.module.scss";

const OpenSearch = createContext({
  openSearch: false,
  setOpenSearch: (value: boolean) => {},
});
const OpenSearchProvider = OpenSearch.Provider;
export const useOpenSearchContext = () => useContext(OpenSearch);

type MarketProps = {
  onCurrencyChange: (value: Option) => void;
};

const Market: React.FC<MarketProps> = ({ onCurrencyChange }) => {
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);

  const marketStore = useLocalStore(() => new MarketStore());

  return (
    <div className={styleMarket.market}>
      {!openSearch && (
        <OpenSearchProvider value={{ openSearch, setOpenSearch }}>
          <MarketChange currency={marketStore.currency} />
          <CurrencyFilter />
          <CoinFilter
            onChange={(trend: string) => marketStore.setCoinTrend(trend)}
          />
          <hr className={styleMarket.listLine}></hr>
        </OpenSearchProvider>
      )}

      {openSearch && (
        <OpenSearchProvider value={{ openSearch, setOpenSearch }}>
          <MarketSearch />
        </OpenSearchProvider>
      )}
      <CoinList />
    </div>
  );
};

export default Market;
