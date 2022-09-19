import React from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import cn from "classnames";
import { Card } from "components/Card";
import { createChart, MINICHARTOPTIONS } from "config/chart";
import { COLORS, colorsmap } from "config/colors";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Chart, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import CoinCardStore from "store/CoinCardStore/CoinCardStore";
import { Coin } from "store/CoinListStore/CoinListStore";
import { useSaveParams } from "store/RootStore/hooks/useSaveParams";
import rootStore from "store/RootStore/instance";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./styles.module.scss";

ChartJS.register(...registerables);

type CoinCardProps = {
  coin: Coin;
};

const CoinCard: React.FC<CoinCardProps> = ({ coin }) => {
  const coinCardStore = useLocalStore(() => new CoinCardStore(coin.id));

  const params = useSaveParams();

  React.useEffect(() => {
    coinCardStore.miniChartRequest();
  }, []);

  const color = React.useMemo(() => {
    return coin.priceChangePercentage24h.startsWith("+")
      ? colorsmap[COLORS.positive]
      : coin.priceChangePercentage24h.startsWith("-")
      ? colorsmap[COLORS.negative]
      : colorsmap[COLORS.neutral];
  }, [coin.priceChangePercentage24h]);

  const chartdata = createChart(
    toJS(coinCardStore.dates),
    `${rootStore.coinFeature.currency.symbol}`,
    toJS(coinCardStore.prices),
    color,
    color,
    1.5,
    0
  );

  const classnames = cn(
    styles.coin_changePercentage24h,
    coin.priceChangePercentage24h.startsWith("+") && COLORS.positive,
    coin.priceChangePercentage24h.startsWith("-") && COLORS.negative,
    !coin.priceChangePercentage24h.startsWith("+") &&
      !coin.priceChangePercentage24h.startsWith("-") &&
      COLORS.neutral
  );

  return (
    <Link to={`/coin/${coin.id}/${params}`} className={styles.link}>
      <Card
        image={coin.image}
        title={coin.name}
        subtitle={coin.symbol}
        className={styles.coin}
        content={
          <div className={styles.coin_chartAndPriceAndChangePercentage24h}>
            <div className={styles.coin_chart}>
              <Line data={chartdata} options={MINICHARTOPTIONS} height="auto" />
            </div>
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

export default observer(CoinCard);
