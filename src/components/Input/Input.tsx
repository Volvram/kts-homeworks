import React from "react";

import cn from "classnames";

import styles from "./styles.module.scss";

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
  disabled = false,
  ...attributes
}) => {
  const [currentValue, setValue] = React.useState<string>(value);

  const classnames = cn(
    styles.input,
    disabled && styles.input_disabled,
    className
  );

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let target = event.target;
    setValue(target.value);
    onChange(target.value);
  };

  return (
    <input
      type="text"
      className={classnames}
      value={currentValue}
      onInput={handleInput}
      disabled={disabled}
      {...attributes}
    />
  );
};
