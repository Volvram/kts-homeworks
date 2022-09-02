import React from "react";

import { Button } from "@components/Button/Button";
import CoinFilterStore from "@store/CoinFilterStore/CoinFilterStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";

const CoinFilter: React.FC = () => {
  const coinFilterStore = useLocalStore(() => new CoinFilterStore());

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    const target: any = e.target;

    coinFilterStore.setClickedCategory(target.firstChild.data);
  }, []);

  return (
    <div className={styles.coin__filter}>
      {coinFilterStore.categories.map((category, index) => {
        return (
          <Button
            key={category}
            className={
              category === coinFilterStore.clickedCategory
                ? coinFilterStore.clickedStyle
                : coinFilterStore.unclickedStyle
            }
            onClick={handleClick}
          >
            {category}
          </Button>
        );
      })}
    </div>
  );
};

export default observer(CoinFilter);
