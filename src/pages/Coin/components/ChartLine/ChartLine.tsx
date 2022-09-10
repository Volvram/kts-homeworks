import React from "react";

import { Button } from "components/Button/Button";
import { CHARTOPTIONS } from "config/chart";
import { periodsValue } from "config/periodsEnum";
import ChartStore from "store/ChartLineStore/ChartLineStore";
import rootStore from "store/RootStore/instance";
import { useLocalStore } from "utils/useLocalStore";
import { Chart as ChartJS, registerables } from "chart.js";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";

import styles from "./styles.module.scss";
ChartJS.register(...registerables);

const ChartLine: React.FC = () => {
  const { id } = useParams();

  const chartStore = useLocalStore(() => new ChartStore(id));

  React.useEffect(() => {
    chartStore.pricesRequest();
  }, []);

  const CHARTDATA = {
    labels: [""],
    datasets: [
      {
        label: `${rootStore.coinFeature.currency.symbol}`,
        spanGaps: false,
        backgroundColor: "#0063F5",
        borderColor: "#0063F5",
        pointRadius: 1,
        data: [0],
      },
    ],
  };

  const chartdata = Object.assign({}, CHARTDATA);
  chartdata.labels = toJS(chartStore.dates);
  chartdata.datasets[0].data = toJS(chartStore.prices);

  return (
    <div className={styles.chart}>
      <div className={styles.chart_line}>
        <Line data={chartdata} options={CHARTOPTIONS} height="300px" />
      </div>
      <div className={styles.chart_buttons}>
        {periodsValue.map((period) => {
          return (
            <Button
              key={period}
              className={
                period === chartStore.clickedPeriod
                  ? `${styles.chart_buttons_button} ${styles.chart_buttons_button__clicked}`
                  : `${styles.chart_buttons_button}`
              }
              onClick={chartStore.handleClick(period)}
            >
              {period}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default observer(ChartLine);
