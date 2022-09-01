import React from "react";

import { Button } from "@components/Button/Button";
import CoinFilterStore from "@store/CoinFilterStore/CoinFilterStore";
import { CoinCategories } from "@store/RootStore/CoinTrendStore/CoinTrendStore";
import { log } from "@utils/log";
import { useLocalStore } from "@utils/useLocalStore";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.module.scss";

const CoinFilter: React.FC = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const coinFilterStore = useLocalStore(() => new CoinFilterStore());

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    const target: any = e.target;

    searchParams.set("coinTrend", target.firstChild.data);
    setSearchParams(searchParams);

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

export default CoinFilter;
