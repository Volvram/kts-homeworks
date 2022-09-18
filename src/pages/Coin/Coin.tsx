import React from "react";

import { Card } from "components/Card/Card";
import Loader, { LoaderSize } from "components/Loader/Loader";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import CoinStore from "store/CoinStore/CoinStore";
import { log } from "utils/log";
import { useLocalStore } from "utils/useLocalStore";

import ChartLine from "./components/ChartLine/ChartLine";
import Header from "./components/Header/Header";
import styles from "./styles.module.scss";

const Coin: React.FC = () => {
  const { id } = useParams();

  const coinStore = useLocalStore(() => new CoinStore(id));

  React.useEffect(() => {
    coinStore.coinDataRequest();
  }, []);

  return (
    <div className={styles.coinPage}>
      <Header coinData={coinStore.coinData} loading={coinStore.loading} />
      {coinStore.loading ? (
        <Loader loading={coinStore.loading} size={LoaderSize.l} />
      ) : (
        <>
          <div className={styles.price}>
            <div className={styles.price_current}>
              <div className={styles.price_current_currency}>
                {coinStore.coinData.currencySymbol}
              </div>
              <div>{coinStore.coinData.currentPrice}</div>
            </div>
            <div className={styles.price_change}>
              <div
                className={`${styles.price_change_number} ${coinStore.coinData.priceChangeColor}`}
              >
                {coinStore.coinData.priceChange24hToString}
              </div>
              <div className={`${coinStore.coinData.priceChangeColor}`}>
                ({coinStore.coinData.priceChangePercentage24hToString})
              </div>
            </div>
          </div>
          <ChartLine />
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
                  className={`${styles.coinCard_content_percentage} ${coinStore.coinData.priceChangeColor}`}
                >
                  {coinStore.coinData.priceChangePercentage24hToString}
                </div>
              </div>
            }
          />
          <div className={styles.transactions}>Transactions</div>
        </>
      )}
    </div>
  );
};

export default observer(Coin);
