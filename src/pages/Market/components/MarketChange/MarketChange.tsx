import React from "react";

import enableSearch from "@assets/img/enableSearch.svg";
import { Button } from "@components/Button/Button";
import { useOpenSearchContext } from "@pages/Market/Market";
import MarketChangeStore from "@store/MarketChangeStore/MarketChangeStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styleMarketChange from "./MarketChange.module.scss";

const MarketChange: React.FC = () => {
  const openContext = useOpenSearchContext();

  const marketChangeStore = useLocalStore(() => new MarketChangeStore());

  React.useEffect(() => {
    marketChangeStore.coinRequest();
  }, []);

  return (
    <div>
      <div className={styleMarketChange.market_change}>
        <div className={styleMarketChange.market_change_trend}>
          Market is {marketChangeStore.marketTrend}
        </div>
        <div className={marketChangeStore.marketColor}>
          {marketChangeStore.marketPercentage}
        </div>
        <Button
          className={styleMarketChange.enableSearch}
          onClick={() => openContext.setOpenSearch(true)}
        >
          <img src={enableSearch} alt="search"></img>
        </Button>
      </div>
      <div className={styleMarketChange.market_change_period}>
        In the past 24 hours
      </div>
    </div>
  );
};

export default observer(MarketChange);
