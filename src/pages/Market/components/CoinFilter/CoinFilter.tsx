import React from "react";

import { Button } from "components/Button/Button";
import { coinCategoriesValue } from "config/coinCategoriesEnum";
import { observer } from "mobx-react-lite";
import CoinFilterStore from "store/CoinFilterStore/CoinFilterStore";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./styles.module.scss";

const CoinFilter: React.FC = () => {
  const coinFilterStore = useLocalStore(() => new CoinFilterStore());

  return (
    <div className={styles.coin__filter}>
      {coinCategoriesValue.map((category) => {
        return (
          <Button
            key={category}
            className={
              category === coinFilterStore.clickedCategory
                ? `${styles.coin__filter_choice}  ${styles.coin__filter_choice__clicked}`
                : `${styles.coin__filter_choice}`
            }
            onClick={coinFilterStore.handleClick(category)}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
};

export default observer(CoinFilter);
