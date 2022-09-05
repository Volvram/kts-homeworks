import React from "react";

import { Button } from "@components/Button/Button";

import styles from "./styles.module.scss";

const Chart: React.FC = () => {
  const handleClick = (e: React.MouseEvent) => {
    const target: any = e.target;

    for (let i = 0; i < target.parentNode.children.length; i++) {
      if (target.parentNode.children[i] !== target) {
        target.parentNode.children[i].classList.remove(
          styles.chart_buttons_button__clicked
        );
      }
    }

    target.classList.add(styles.chart_buttons_button__clicked);
  };

  return (
    <div className={styles.chart}>
      <div className={styles.chart_line}></div>
      <div className={styles.chart_buttons}>
        <Button className={styles.chart_buttons_button} onClick={handleClick}>
          1 H
        </Button>
        <Button
          className={`${styles.chart_buttons_button} ${styles.chart_buttons_button__clicked}`}
          onClick={handleClick}
        >
          24 H
        </Button>
        <Button className={styles.chart_buttons_button} onClick={handleClick}>
          1 W
        </Button>
        <Button className={styles.chart_buttons_button} onClick={handleClick}>
          1 M
        </Button>
        <Button className={styles.chart_buttons_button} onClick={handleClick}>
          6 M
        </Button>
        <Button className={styles.chart_buttons_button} onClick={handleClick}>
          1 Y
        </Button>
      </div>
    </div>
  );
};

export default Chart;
