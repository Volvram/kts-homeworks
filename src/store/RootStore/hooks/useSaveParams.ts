import { queryParamsEnum } from "config/queryParamsEnum";
import React from "react";
import { useSearchParams } from "react-router-dom"


export const useSaveParams = (): string => {
    const [searchParams, setSearchParams] = useSearchParams();
    return React.useMemo(() => {
        return searchParams.get(queryParamsEnum.page) && searchParams.get(queryParamsEnum.search)
          ? `?page=${searchParams.get(queryParamsEnum.page)}&search=${searchParams.get(queryParamsEnum.search)}`
          : searchParams.get(queryParamsEnum.page)
          ? `?page=${searchParams.get(queryParamsEnum.page)}`
          : searchParams.get(queryParamsEnum.search)
          ? `?search=${searchParams.get(queryParamsEnum.search)}`
          : "";
    }, [searchParams]);
}