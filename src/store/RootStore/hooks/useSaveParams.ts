import React from "react";

import { queryParamsEnum } from "config/queryParamsEnum";
import { useSearchParams } from "react-router-dom";

export const useSaveParams = (): string => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get(queryParamsEnum.page);
  const search = searchParams.get(queryParamsEnum.search);

  return React.useMemo(() => {
    return page && search
      ? `?page=${page}&search=${search}`
      : page
      ? `?page=${page}`
      : search
      ? `?search=${search}`
      : "";
  }, [searchParams]);
};
