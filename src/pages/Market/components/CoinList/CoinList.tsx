import React from "react";

import { Card } from "@components/Card/Card";
import CoinListStore from "@store/CoinListStore/CoinListStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import rootStore from "@store/RootStore/instance";
import { log } from "@utils/log";
import { useLocalStore } from "@utils/useLocalStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Link, useSearchParams } from "react-router-dom";

import styleCoinList from "./CoinList.module.scss";

const CoinList: React.FC = () => {
  const coinListStore = useLocalStore(() => new CoinListStore());
  let [searchParams, setSearchParams] = useSearchParams();
  useQueryParamsStoreInit();

  React.useEffect(() => {
    coinListStore.coinRequest(searchParams.get("search"));
  }, []);

  return (
    <div className={styleCoinList.coinList}>
      {coinListStore.getCoins().map((coin) => {
        const coinPriceChange: string = coin.priceChangePercentage24h;

        let coinPricePercentage: string = `${styleCoinList.coin_changePercentage24h}`;

        if (coinPriceChange.startsWith("+")) {
          coinPricePercentage += " positive";
        } else if (coinPriceChange.startsWith("-")) {
          coinPricePercentage += " negative";
        } else {
          coinPricePercentage += " neutral";
        }

        return (
          <Link
            to={`/coin/${coin.id}`}
            key={coin.id}
            style={{
              textDecoration: "none",
              marginTop: "8px",
              marginLeft: "16px",
              marginRight: "16px",
            }}
          >
            <Card
              image={coin.image}
              title={coin.name}
              subtitle={coin.symbol}
              className={styleCoinList.coin}
              content={
                <div
                  className={
                    styleCoinList.coin_chartAndPriceAndChangePercentage24h
                  }
                >
                  <div
                    className={styleCoinList.coin_chart}
                    style={{ width: "50px", height: "25px" }}
                  ></div>
                  <div
                    className={styleCoinList.coin_priceAndChangePercentage24h}
                  >
                    <div className={styleCoinList.coin_price}>
                      {coin.currentPrice}
                    </div>
                    <div className={coinPricePercentage}>
                      {coin.priceChangePercentage24h}
                    </div>
                  </div>
                </div>
              }
            ></Card>
          </Link>
        );
      })}
    </div>
  );
};

export default observer(CoinList);
