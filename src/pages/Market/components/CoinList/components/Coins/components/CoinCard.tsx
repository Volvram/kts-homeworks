import React from "react";

import { Card } from "@components/Card";
import { COLORS } from "@config/colors";
import { Coin } from "@store/CoinListStore/CoinListStore";
import cn from "classnames";
import cnBind from "classnames/bind";
import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const cx = cnBind.bind(COLORS);

type CoinCardProps = {
  coin: Coin;
};

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const classnames = cx({
    positive: coin.priceChangePercentage24h.startsWith("+"),
    negative: coin.priceChangePercentage24h.startsWith("-"),
    neutral:
      !coin.priceChangePercentage24h.startsWith("+") &&
      !coin.priceChangePercentage24h.startsWith("-"),
  });

  return (
    <Link to={`/coin/${coin.id}`} className={styles.link}>
      <Card
        image={coin.image}
        title={coin.name}
        subtitle={coin.symbol}
        className={styles.coin}
        content={
          <div className={styles.coin_chartAndPriceAndChangePercentage24h}>
            <div className={styles.coin_chart}></div>
            <div className={styles.coin_priceAndChangePercentage24h}>
              <div className={styles.coin_price}>{coin.currentPrice}</div>
              <div className={cn(styles.coin_changePercentage24h, classnames)}>
                {coin.priceChangePercentage24h}
              </div>
            </div>
          </div>
        }
      />
    </Link>
  );
};

export default CoinCard;
