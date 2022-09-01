import React from "react";

import search from "@assets/img/search.svg";
import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { useOpenSearchContext } from "@pages/Market/Market";
import MarketSearchStore from "@store/MarketSearchStore/MarketSearchStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import searchMarketSearch from "./MarketSearch.module.scss";

const MarketSearch: React.FC = () => {
  const OpenSearchContext = useOpenSearchContext();

  let [searchParams, setSearchParams] = useSearchParams();

  useQueryParamsStoreInit();

  const marketSearchStore = useLocalStore(() => new MarketSearchStore());

  return (
    <div className={searchMarketSearch.search}>
      <div className={searchMarketSearch.search_line}>
        <Button
          className={searchMarketSearch.search_line_submit}
          onClick={() => {}}
        >
          <img src={search}></img>
        </Button>

        <Input
          className={searchMarketSearch.search_line_input}
          value={marketSearchStore.params != undefined ? `${marketSearchStore.params}` : ""}
          onChange={(value: string) => {
            searchParams.set("search", value);
            setSearchParams(searchParams);
          }}
          placeholder={"Search Cryptocurrency"}
        />
      </div>
      <Button
        onClick={() => {
          OpenSearchContext.setOpenSearch(false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default observer(MarketSearch);
