import React from "react";

import { Button } from "@components/Button/Button";
import ChartStore from "@store/ChartLineStore/ChartLineStore";
import rootStore from "@store/RootStore/instance";
import { useLocalStore } from "@utils/useLocalStore";
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

  const chartStore = useLocalStore(() => new ChartStore());

  React.useEffect(() => {
    chartStore.setId(id);
    chartStore.pricesRequest();
  }, []);

  const CHARTDATA = {
    labels: toJS(chartStore.dates),
    datasets: [
      {
        label: `${rootStore.currency.currency.symbol}`,
        spanGaps: false,
        backgroundColor: "#0063F5",
        borderColor: "#0063F5",
        pointRadius: 1,
        data: toJS(chartStore.prices),
      },
    ],
  };

  const CHARTOPTIONS = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          display: true,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
      y: {
        ticks: {
          display: false,
          beginAtZero: true,
        },
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  };

  return (
    <div className={styles.chart}>
      <div className={styles.chart_line}>
        <Line data={CHARTDATA} options={CHARTOPTIONS} height="300px" />
      </div>
      <div className={styles.chart_buttons}>
        {chartStore.periods.map((period) => {
          return (
            <Button
              key={period}
              className={
                period === chartStore.clickedPeriod
                  ? chartStore.clickedStyle
                  : chartStore.unclickedStyle
              }
              onClick={chartStore.handleClick}
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
