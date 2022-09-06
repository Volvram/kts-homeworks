import React from "react";

import { Button } from "@components/Button/Button";

import chartStyle from "./Chart.module.scss";

const Chart: React.FC = () => {
  const handleClick = (e: React.MouseEvent) => {
    const target: any = e.target;

    for (let i = 0; i < target.parentNode.children.length; i++) {
      if (target.parentNode.children[i] !== target) {
        target.parentNode.children[i].classList.remove(
          chartStyle.chart_buttons_button__clicked
        );
      }
    }

    target.classList.add(chartStyle.chart_buttons_button__clicked);
  };

  return (
    <div className={chartStyle.chart}>
      <div className={chartStyle.chart_line}></div>
      <div className={chartStyle.chart_buttons}>
        <Button
          className={chartStyle.chart_buttons_button}
          onClick={handleClick}
        >
          1 H
        </Button>
        <Button
          className={`${chartStyle.chart_buttons_button} ${chartStyle.chart_buttons_button__clicked}`}
          onClick={handleClick}
        >
          24 H
        </Button>
        <Button
          className={chartStyle.chart_buttons_button}
          onClick={handleClick}
        >
          1 W
        </Button>
        <Button
          className={chartStyle.chart_buttons_button}
          onClick={handleClick}
        >
          1 M
        </Button>
        <Button
          className={chartStyle.chart_buttons_button}
          onClick={handleClick}
        >
          6 M
        </Button>
        <Button
          className={chartStyle.chart_buttons_button}
          onClick={handleClick}
        >
          1 Y
        </Button>
      </div>
    </div>
  );
};

export default Chart;
