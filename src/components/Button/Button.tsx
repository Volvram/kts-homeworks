import React from "react";
import "./Button.scss";

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
  let classes: string = "button ";

  if (className) {
    classes += className;
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
