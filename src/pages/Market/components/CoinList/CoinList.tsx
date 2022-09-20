import React from "react";

import WithLoader from "components/WithLoader";
import { getCurrencies } from "config/currencies";
import { LoaderSize } from "config/loader";
import { queryParamsEnum } from "config/queryParamsEnum";
import { observer } from "mobx-react-lite";
import { useShowChartsContext } from "pages/Market/Market";
import ReactPaginate from "react-paginate";
import { useSearchParams } from "react-router-dom";
import CoinListStore from "store/CoinListStore/CoinListStore";
import { useQueryParamsStoreInit } from "store/RootStore/hooks/useQueryParamsStoreInit";
import rootStore from "store/RootStore/instance";
import { useLocalStore } from "utils/useLocalStore";

import Coins from "./components/Coins/Coins";
import styles from "./styles.module.scss";

const CoinList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { setShowCharts } = useShowChartsContext();

  const coinListStore = useLocalStore(() => new CoinListStore());
  useQueryParamsStoreInit();

  React.useEffect(() => {
    const initialPage = rootStore.query.getParam(queryParamsEnum.page);
    if (initialPage) {
      coinListStore.setItemOffset(
        coinListStore.itemsPerPage * (Number(initialPage) - 1)
      );
    } else {
      coinListStore.setItemOffset(0);
    }

    coinListStore.changePage();

    getCurrencies();
  }, []);

  React.useEffect(() => {
    setShowCharts(false);
  }, [
    rootStore.query.getParam(queryParamsEnum.page),
    rootStore.query.getParam(queryParamsEnum.search),
    rootStore.coinFeature.currency,
    rootStore.coinFeature.coinTrend,
  ]);

  const handlePage = React.useCallback(
    (event: { selected: number }) => {
      coinListStore.handlePageClick(event);
      searchParams.set(queryParamsEnum.page, `${event.selected + 1}`);
      setSearchParams(searchParams);
    },
    [searchParams]
  );

  return (
    <>
      <WithLoader loading={coinListStore.loadingItems} size={LoaderSize.l}>
        <Coins currentCoins={coinListStore.currentItems} />
      </WithLoader>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePage}
        forcePage={
          rootStore.query.getParam(queryParamsEnum.page) !== undefined
            ? Number(rootStore.query.getParam(queryParamsEnum.page)) - 1
            : 0
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
