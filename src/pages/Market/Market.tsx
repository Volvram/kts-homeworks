import React, { createContext, useContext } from "react";

import { observer } from "mobx-react-lite";

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

const Market: React.FC = () => {
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);

  return (
    <div className={styleMarket.market}>
      {!openSearch && (
        <OpenSearchProvider value={{ openSearch, setOpenSearch }}>
          <MarketChange />
          <CurrencyFilter />
          <CoinFilter />
          <hr className={styleMarket.listLine}></hr>
        </OpenSearchProvider>
      )}

      {openSearch && (
        <OpenSearchProvider value={{ openSearch, setOpenSearch }}>
          <MarketSearch />
        </OpenSearchProvider>
      )}
      <CoinList itemsPerPage={5} />
    </div>
  );
};

export default observer(Market);
