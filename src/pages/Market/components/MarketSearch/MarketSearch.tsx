import React from "react";

import { Button } from "@components/Button/Button";
import { Input } from "@components/Input/Input";
import { useOpenSearchContext } from "@pages/Market/Market";

import search from "../../../../assets/img/search.svg";
import searchMarketSearch from "./MarketSearch.module.scss";

const MarketSearch: React.FC = () => {
  const OpenSearchContext = useOpenSearchContext();

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
          value={""}
          onChange={(value: string) => {
            //   eslint-disable-next-line no-console
            console.log(value);
          }}
          placeholder={"Search Cryptocurrency"}
        />
      </div>
      <Button
        onClick={() => {
          OpenSearchContext.setSearch(false);
        }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default MarketSearch;
