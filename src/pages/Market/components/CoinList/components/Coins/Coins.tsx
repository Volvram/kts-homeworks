import React from "react";

import { observer } from "mobx-react-lite";
import { Coin } from "store/CoinListStore/CoinListStore";

import CoinCard from "./components/CoinCard";
import styles from "./styles.module.scss";

type CoinsProps = {
  currentCoins: Coin[] | null;
};

const Coins: React.FC<CoinsProps> = ({ currentCoins }) => {
  return (
    <div className={styles.coins}>
      {currentCoins !== null &&
        currentCoins.map((coin) => {
          return <CoinCard key={coin.id} coin={coin} />;
        })}
      {currentCoins == null && (
        <div className={styles.coins_not_found}>Data not found</div>
      )}
    </div>
  );
};

export default observer(Coins);
