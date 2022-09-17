import React from "react";

import cn from "classnames";

import styles from "./styles.module.scss";

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
  const classNames = cn(
    styles.button,
    disabled && styles.button_disabled,
    className
  );

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
