import React from "react";

import cn from "classnames";
import cnBind from "classnames/bind";

import styles from "./styles.module.scss";

const cx = cnBind.bind(styles);

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  className,
  disabled,
  ...attributes
}) => {
  const [currentValue, setValue] = React.useState<string>(value);

  const classNames = cx({ input: true, input_disabled: disabled });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target = event.target;
    setValue(target.value);
    onChange(target.value);
  };

  return (
    <input
      type="text"
      className={cn(classNames, className)}
      value={currentValue}
      onInput={handleInput}
      disabled={disabled}
      {...attributes}
    />
  );
};
