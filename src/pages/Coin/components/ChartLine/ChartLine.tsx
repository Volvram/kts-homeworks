import React from "react";

import { Chart as ChartJS, registerables } from "chart.js";
import { Button } from "components/Button/Button";
import Loader from "components/Loader";
import { LoaderSize } from "components/Loader/Loader";
import {
  CHARTDATA,
  ChartDataType,
  CHARTOPTIONS,
  createChart,
} from "config/chart";
import { periodsValue } from "config/periodsEnum";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { Chart, Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import ChartStore from "store/ChartLineStore/ChartLineStore";
import rootStore from "store/RootStore/instance";
import { log } from "utils/log";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./styles.module.scss";

ChartJS.register(...registerables);

const ChartLine: React.FC = () => {
  const { id } = useParams();

  const chartStore = useLocalStore(() => new ChartStore(id));

  React.useEffect(() => {
    chartStore.pricesRequest();
  }, []);

  const chartdata = React.useMemo(() => {
    return createChart(
      toJS(chartStore.dates),
      `${rootStore.coinFeature.currency.symbol}`,
      toJS(chartStore.prices)
    );
  }, [
    toJS(chartStore.dates),
    `${rootStore.coinFeature.currency.symbol}`,
    toJS(chartStore.prices),
  ]);

  return (
    <>
      {chartStore.loading ? (
        <Loader loading={chartStore.loading} size={LoaderSize.l}></Loader>
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default observer(ChartLine);
