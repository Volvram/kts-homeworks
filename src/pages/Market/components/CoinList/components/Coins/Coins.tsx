import React from "react";

import { Coin } from "@store/CoinListStore/CoinListStore";
import { observer } from "mobx-react-lite";

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
    </div>
  );
};

export default observer(Coins);
