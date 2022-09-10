import React from "react";

import Dropdown from "components/Dropdown";
import { OptionType } from "components/Dropdown/Dropdown";
import { CURRENCIES } from "config/currencies";
import CurrencyFilterStore from "store/CurrencyFilterStore/CurrencyFilterStore";
import { useLocalStore } from "utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";

const CurrencyFilter: React.FC = () => {
  const currencyFilterStore = useLocalStore(() => new CurrencyFilterStore());

  const handleChange = React.useCallback((currency: OptionType) => {
    currencyFilterStore.setCurrency(currency);
  }, []);

  return (
    <div className={styles.currencyFilter}>
      <div className={styles.currencyFilter_coinsHeader}>Coins</div>
      <Dropdown
        options={CURRENCIES}
        defaultValue={currencyFilterStore.currency}
        onChange={handleChange}
        description={currencyFilterStore.description}
        defaultOptionDescription={currencyFilterStore.defaultOptionDescription}
      />
    </div>
  );
};

export default observer(CurrencyFilter);
