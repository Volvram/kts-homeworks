import React, { createContext, useContext } from "react";

import CoinFilter from "./components/CoinFilter/CoinFilter";
import CoinList from "./components/CoinList/CoinList";
import CurrencyFilter from "./components/CurrencyFilter/CurrencyFilter";
import MarketChange from "./components/MarketChange/MarketChange";
import MarketSearch from "./components/MarketSearch/MarketSearch";
import styles from "./styles.module.scss";

const OpenSearch = createContext({
  openSearch: false,
  setOpenSearch: (value: boolean) => {},
});
const OpenSearchProvider = OpenSearch.Provider;
export const useOpenSearchContext = () => useContext(OpenSearch);

const ShowCharts = createContext({
  showCharts: false,
  setShowCharts: (value: boolean) => {},
});
const ShowChartsProvider = ShowCharts.Provider;
export const useShowChartsContext = () => useContext(ShowCharts);

const Market: React.FC = () => {
  const [openSearch, setOpenSearch] = React.useState(false);

  const [showCharts, setShowCharts] = React.useState(false);

  return (
    <div className={styles.market}>
      <OpenSearchProvider value={{ openSearch, setOpenSearch }}>
        {!openSearch && (
          <>
            <ShowChartsProvider value={{ showCharts, setShowCharts }}>
              <MarketChange />
            </ShowChartsProvider>
            <CurrencyFilter />
            <CoinFilter />
            <hr className={styles.listLine}></hr>
          </>
        )}
        {openSearch && <MarketSearch />}
      </OpenSearchProvider>
      <ShowChartsProvider value={{ showCharts, setShowCharts }}>
        <CoinList />
      </ShowChartsProvider>
    </div>
  );
};

export default Market;
