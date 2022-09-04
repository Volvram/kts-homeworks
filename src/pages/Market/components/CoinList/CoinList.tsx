import React from "react";

import CoinListStore, { Coin } from "@store/CoinListStore/CoinListStore";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";
import rootStore from "@store/RootStore/instance";
import { log } from "@utils/log";
import { useLocalStore } from "@utils/useLocalStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";

import Coins from "./components/Coins/Coins";
import styles from "./styles.module.scss";

const CoinList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const coinListStore = useLocalStore(() => new CoinListStore());
  useQueryParamsStoreInit();

  React.useEffect(() => {
    const initialPage = rootStore.query.getParam("page");
    if (initialPage) {
      coinListStore.setItemOffset(
        coinListStore.itemsPerPage * (Number(initialPage) - 1)
      );
    } else {
      coinListStore.setItemOffset(0);
    }

    coinListStore.changePage();
  }, []);


  return (
    <>
      <Coins currentCoins={coinListStore.currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event: { selected: number }) => {
          coinListStore.handlePageClick(event);
          searchParams.set("page", `${event.selected + 1}`);
          setSearchParams(searchParams);
        }}
        forcePage={
          rootStore.query.getParam("page") != undefined
            ? Number(rootStore.query.getParam("page")) - 1
            : undefined
        }
        pageRangeDisplayed={3}
        pageCount={coinListStore.pageCount}
        previousLabel="<"
        renderOnZeroPageCount={undefined}
        activeClassName={`${styles.paginator_li_active}`}
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
