import React from "react";

import search from "@assets/img/search.svg";
import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { useOpenSearchContext } from "@pages/Market/Market";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";

import searchMarketSearch from "./MarketSearch.module.scss";

const MarketSearch: React.FC = () => {
  const OpenSearchContext = useOpenSearchContext();

  let [searchParams, setSearchParams] = useSearchParams();

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
          OpenSearchContext.setOpenSearch(false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default observer(MarketSearch);
