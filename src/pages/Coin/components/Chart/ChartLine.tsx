import React from "react";

import { Button } from "@components/Button/Button";
import ChartStore from "@store/ChartLineStore/ChartLineStore";
import { useLocalStore } from "@utils/useLocalStore";
import { Chart as ChartJS, registerables } from "chart.js";
import { observer } from "mobx-react-lite";
import { Chart } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

import styles from "./styles.module.scss";
ChartJS.register(...registerables);

const ChartLine: React.FC = () => {
  const chartStore = useLocalStore(() => new ChartStore());

  const CHARTDATA = {
    labels: [
      "7:00",
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
    ],
    datasets: [
      {
        label: "Price",
        spanGaps: false,
        backgroundColor: "#0063F5",
        borderColor: "#0063F5",
        pointRadius: 1,
        data: [0, 100, 10, 5, 2, 20, 30, 45, 7, 58],
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
