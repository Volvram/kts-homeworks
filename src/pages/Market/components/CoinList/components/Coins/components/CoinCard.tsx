import React from "react";

import cn from "classnames";
import { Card } from "components/Card";
import { COLORS } from "config/colors";
import { Link } from "react-router-dom";
import { Coin } from "store/CoinListStore/CoinListStore";

import styles from "./styles.module.scss";

type CoinCardProps = {
  coin: Coin;
};

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const classnames = cn(
    styles.coin_changePercentage24h,
    coin.priceChangePercentage24h.startsWith("+") && COLORS.positive,
    coin.priceChangePercentage24h.startsWith("-") && COLORS.negative,
    !coin.priceChangePercentage24h.startsWith("+") &&
      !coin.priceChangePercentage24h.startsWith("-") &&
      COLORS.neutral
  );

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
              <div className={classnames}>{coin.priceChangePercentage24h}</div>
            </div>
          </div>
        }
      />
    </Link>
  );
};

export default CoinCard;
