import React from "react";

import Dropdown from "components/Dropdown";
import { OptionType } from "components/Dropdown/Dropdown";
import { observer } from "mobx-react-lite";
import CurrencyFilterStore from "store/CurrencyFilterStore/CurrencyFilterStore";
import { useLocalStore } from "utils/useLocalStore";

import styles from "./styles.module.scss";

const CurrencyFilter: React.FC = () => {
  const currencyFilterStore = useLocalStore(() => new CurrencyFilterStore());

  const handleChange = React.useCallback((currency: OptionType) => {
    currencyFilterStore.setCurrency(currency);
  }, []);

  React.useEffect(() => {
    currencyFilterStore.getCurrencies();
  }, []);

  return (
    <div className={styles.currencyFilter}>
      <div className={styles.currencyFilter_coinsHeader}>Coins</div>
      <Dropdown
        options={currencyFilterStore.currencies}
        defaultValue={currencyFilterStore.currency}
        onChange={handleChange}
        description={currencyFilterStore.description}
        defaultOptionDescription={currencyFilterStore.defaultOptionDescription}
      />
    </div>
  );
};

export default observer(CurrencyFilter);
