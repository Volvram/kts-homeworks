import React from "react";

import { Card } from "@components/Card/Card";
import CoinStore from "@store/CoinStore/CoinStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import Chart from "./components/Chart/Chart";
import Header from "./components/Header/Header";
import styles from "./styles.module.scss";

export type CoinData = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  currentPrice: number;
  currencySymbol: string;
  priceChange24h: number;
  priceChangePercentage24h: number;
};

const Coin: React.FC = () => {
  const { id } = useParams();

  const coinStore = useLocalStore(() => new CoinStore());

  React.useEffect(() => {
    coinStore.setId(id);
    coinStore.coinDataRequest();
  }, []);

  return (
    <div className={styles.coinPage}>
      <Header coinData={coinStore.coinData} />
      <div className={styles.price}>
        <div className={styles.price_current}>
          <div className={styles.price_current_currency}>
            {coinStore.coinData.currencySymbol}
          </div>
          <div>{coinStore.coinData.currentPrice}</div>
        </div>
        <div className={styles.price_change}>
          <div
            className={`${styles.price_change_number} ${coinStore.priceChangeColor}`}
          >
            {coinStore.coinData.priceChange24hToString}
          </div>
          <div className={`${coinStore.priceChangeColor}`}>
            ({coinStore.coinData.priceChangePercentage24hToString})
          </div>
        </div>
      </div>
      <Chart />
      <Card
        image={coinStore.coinData.image}
        title={coinStore.coinData.name}
        subtitle={coinStore.coinData.symbol.toUpperCase()}
        className={styles.coinCard}
        content={
          <div className={styles.coinCard_content}>
            <div className={styles.coinCard_content_price}>
              {coinStore.coinData.currencySymbol}
              {coinStore.coinData.currentPrice}
            </div>
            <div
              className={`${styles.coinCard_content_percentage} ${coinStore.priceChangeColor}`}
            >
              {coinStore.coinData.priceChangePercentage24hToString}
            </div>
          </div>
        }
      />
      <div className={styles.transactions}>Transactions</div>
    </div>
  );
};

export default observer(Coin);
