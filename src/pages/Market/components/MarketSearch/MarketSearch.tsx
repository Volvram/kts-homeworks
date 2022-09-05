import React from "react";

import search from "@assets/img/search.svg";
import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { useOpenSearchContext } from "@pages/Market/Market";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import styles from "./styles.module.scss";

const MarketSearch: React.FC = () => {
  const { setOpenSearch } = useOpenSearchContext();

  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className={styles.search}>
      <div className={styles.search_line}>
        <Button className={styles.search_line_submit} onClick={() => {}}>
          <img src={search}></img>
        </Button>

        <Input
          className={styles.search_line_input}
          value={
            searchParams.get("search") != null
              ? `${searchParams.get("search")}`
              : ""
          }
          onChange={(value: string) => {
            searchParams.set("search", value);
            setSearchParams(searchParams);
          }}
          placeholder={"Search Cryptocurrency"}
        />
      </div>
      <Button
        onClick={() => {
          setOpenSearch(false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default observer(MarketSearch);
