import React from "react";

import { Link } from "react-router-dom";
import { Card } from "@components/Card";
import { Coin } from "@store/CoinListStore/CoinListStore";

import styles from "./styles.module.scss";

type CoinsProps = {
    currentCoins: Coin[] | null;
}

const Coins: React.FC<CoinsProps> = ({currentCoins}) => {
    return (
        <div className={styles.coinList}>
            {currentCoins?.map((coin) => {
        const coinPriceChange: string = coin.priceChangePercentage24h;

        let coinPricePercentage: string = `${styles.coin_changePercentage24h}`;

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
              className={styles.coin}
              content={
                <div
                  className={
                    styles.coin_chartAndPriceAndChangePercentage24h
                  }
                >
                  <div
                    className={styles.coin_chart}
                    style={{ width: "50px", height: "25px" }}
                  ></div>
                  <div
                    className={styles.coin_priceAndChangePercentage24h}
                  >
                    <div className={styles.coin_price}>
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
}

export default Coins;