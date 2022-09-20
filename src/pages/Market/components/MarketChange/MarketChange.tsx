import React from "react";

import enableSearch from "assets/img/enableSearch.svg";
import { Button } from "components/Button/Button";
import { observer } from "mobx-react-lite";
import {
  useOpenSearchContext,
  useShowChartsContext,
} from "pages/Market/Market";
import MarketChangeStore from "store/MarketChangeStore/MarketChangeStore";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./styles.module.scss";

const MarketChange: React.FC = () => {
  const { setOpenSearch } = useOpenSearchContext();

  const { setShowCharts } = useShowChartsContext();

  const marketChangeStore = useLocalStore(() => new MarketChangeStore());

  React.useEffect(() => {
    marketChangeStore.coinRequest();
  }, []);

  const handleShowCharts = React.useCallback(() => {
    setShowCharts(true);
  }, [setShowCharts]);

  return (
    <div>
      <div className={styles.market_change}>
        <div className={styles.market_change_trend}>
          Market is {marketChangeStore.marketTrend}
        </div>
        <div className={marketChangeStore.marketColor}>
          {marketChangeStore.marketPercentage}
        </div>
        <Button
          className={styles.enableSearch}
          onClick={() => setOpenSearch(true)}
        >
          <img src={enableSearch} alt="search"></img>
        </Button>
      </div>
      <div className={styles.market_change_periodAndShowCharts}>
        <div className={styles.market_change_period}>In the past 24 hours</div>
        <Button
          className={styles.market_change_showCharts}
          onClick={handleShowCharts}
        >
          Show charts
        </Button>
      </div>
    </div>
  );
};

export default observer(MarketChange);
