import React from "react";

import cn from "classnames";
import { LoaderSize, loaderSVGmap } from "config/loader";

import styles from "./styles.module.scss";

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}) => {
  const classnames = cn(styles.loader, className);
  return (
    <>
      {loading && (
        <div className={classnames}>
          <img src={loaderSVGmap[size]} alt="loading"></img>
        </div>
      )}
    </>
  );
};

export default React.memo(Loader);
