import React from "react";

import { Button } from "@components/Button/Button";
import ChartStore from "@store/ChartStore/ChartStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";

const Chart: React.FC = () => {
  const chartStore = useLocalStore(() => new ChartStore());

  return (
    <div className={styles.chart}>
      <div className={styles.chart_line}></div>
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

export default observer(Chart);
