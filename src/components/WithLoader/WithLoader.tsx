import React from "react";

import { LoaderSize } from "config/loader";

import Loader from "../Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  size?: LoaderSize;
  className?: string;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  size = LoaderSize.m,
  className,
  children,
}) => {
  return (
    <div>
      {loading && <Loader size={size} className={className} />}
      {children}
    </div>
  );
};

export default WithLoader;
