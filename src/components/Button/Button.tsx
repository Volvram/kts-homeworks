import React from "react";

import styleButton from "./Button.module.scss";

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
  let classes: string = `${styleButton.button}`;

  if (className) {
    classes += ` ${className}`;
  }

  if (disabled) {
    classes += ` ${styleButton.button_disabled}`;
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
