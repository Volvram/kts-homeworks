import React from "react";

import cn from "classnames";
import { loaderSVGmap } from "config/loaderSVGmap";

import styles from "./styles.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

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
