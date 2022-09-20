import React from "react";

import search from "assets/img/search.svg";
import { Button } from "components/Button/Button";
import { Input } from "components/Input/Input";
import { queryParamsEnum } from "config/queryParamsEnum";
import { observer } from "mobx-react-lite";
import { useOpenSearchContext } from "pages/Market/Market";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.module.scss";

const MarketSearch: React.FC = () => {
  const { setOpenSearch } = useOpenSearchContext();

  let [searchParams, setSearchParams] = useSearchParams();

  const handleChange = React.useCallback((value: string) => {
    searchParams.set(queryParamsEnum.search, value);
    setSearchParams(searchParams);
  }, []);

  const handleClick = React.useCallback(() => {
    setOpenSearch(false);
  }, []);

  return (
    <div className={styles.search}>
      <div className={styles.search_line}>
        <Button className={styles.search_line_submit}>
          <img src={search} alt="search" />
        </Button>

        <Input
          className={styles.search_line_input}
          value={
            searchParams.get(queryParamsEnum.search) !== null
              ? `${searchParams.get(queryParamsEnum.search)}`
              : ""
          }
          onChange={handleChange}
          placeholder={"Search Cryptocurrency"}
        />
      </div>
      <Button onClick={handleClick} className={styles.search_cancel}>
        Cancel
      </Button>
    </div>
  );
};

export default observer(MarketSearch);
