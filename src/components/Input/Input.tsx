import React from "react";

import styleInput from "./Input.module.scss";

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

  let classes = `${styleInput.input}`;

  if (className) {
    classes += ` ${className}`;
  }

  if (disabled) {
    classes += ` ${styleInput.input_disabled}`;
  }

  const handleInput = (event: React.FormEvent) => {
    let target: any = event.target;
    setValue(target.value);
    onChange(target.value);
  };

  React.useEffect(() => {
    setValue(value);
  }, [value]);

  // (event) => {onChange(event.target.value)}
  return (
    <input
      type="text"
      className={classes}
      value={currentValue}
      onInput={handleInput}
      {...attributes}
      disabled={disabled}
    ></input>
  );
};
