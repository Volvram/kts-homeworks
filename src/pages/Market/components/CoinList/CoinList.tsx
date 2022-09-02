import React from "react";

import { Card } from "@components/Card/Card";
import CoinListStore from "@store/CoinListStore/CoinListStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useSearchParams } from "react-router-dom";
import Coins from "./components/Coins/Coins";
import ReactPaginate from 'react-paginate';

import styles from "./styles.module.scss";


import { log } from "@utils/log";
import { Coin } from "@store/CoinListStore/CoinListStore";
import { toJS } from "mobx";

type CoinListProps = {
  itemsPerPage: number
}

const CoinList: React.FC<CoinListProps> = ({itemsPerPage}) => {
  const coinListStore = useLocalStore(() => new CoinListStore());
  let [searchParams, setSearchParams] = useSearchParams();
  useQueryParamsStoreInit();

  // React.useEffect(() => {
  //   coinListStore.coinRequest(searchParams.get("search"));
  // }, []);



  let coins: Coin[] = [];

  // React.useEffect(() => {
  //   coins = Object.assign([], coinListStore.coins);
  // }, [coinListStore.coins]);

  const [currentItems, setCurrentItems] = React.useState<Coin[] | null>(null);
  const [pageCount, setPageCount] = React.useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = React.useState(0);

  React.useEffect(() => {

    const fetch = async () => {
      await coinListStore.coinRequest(searchParams.get("search"));
      coins = coinListStore.coins;
      log("Количество монет равно: ", coins);
      // Fetch items from another resources.
      const endOffset = itemOffset + itemsPerPage;
      log(`Loading items from ${itemOffset} to ${endOffset}`);
      setCurrentItems(coins.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(coins.length / itemsPerPage));
    }
    
    fetch();
  }, [coinListStore.currencyParams, coinListStore.coinTrendParams, searchParams.get("search") , itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    log(coins.length);
    const newOffset: number = (event.selected * itemsPerPage) % coinListStore.coins.length;
    log("новая партия страниц начинается с: ", newOffset);
    log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };



  return (
    <>
      <Coins currentCoins={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
        previousClassName={`${styles.paginator_li}`}
        pageClassName={`${styles.paginator_li}`}
        breakClassName={`${styles.paginator_li}`}
        nextClassName={`${styles.paginator_li}`}
        containerClassName={`${styles.paginator}`}
      />
    </>
  );
};

export default observer(CoinList);
