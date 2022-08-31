import React from "react";

import { Card } from "@components/Card/Card";
import CoinListStore from "@store/CoinListStore/CoinListStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import styleCoinList from "./CoinList.module.scss";

const CoinList: React.FC = () => {
  const coinListStore = useLocalStore(() => new CoinListStore());

  React.useEffect(() => {
    coinListStore.coinRequest();
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
