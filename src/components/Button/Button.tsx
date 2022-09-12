import React from "react";

import cn from "classnames";
import cnBind from "classnames/bind";

import styles from "./styles.module.scss";

const cx = cnBind.bind(styles);

export type ButtonProps = React.PropsWithChildren<{
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled = false,
  ...rest
}) => {
  const classNames = cx({ button: true, button_disabled: disabled });

  return (
    <button
      type="button"
      className={cn(classNames, className)}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
