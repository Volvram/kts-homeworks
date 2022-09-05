import React from "react";

import { Button } from "@components/Button/Button";
import CoinFilterStore from "@store/CoinFilterStore/CoinFilterStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";

const CoinFilter: React.FC = () => {
  const coinFilterStore = useLocalStore(() => new CoinFilterStore());

  return (
    <div className={styles.coin__filter}>
      {coinFilterStore.categories.map((category) => {
        return (
          <Button
            key={category}
            className={
              category === coinFilterStore.clickedCategory
                ? coinFilterStore.clickedStyle
                : coinFilterStore.unclickedStyle
            }
            onClick={coinFilterStore.handleClick}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
};

export default observer(CoinFilter);
