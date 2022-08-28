import React from "react";

import dropdownStyle from "./Dropdown.module.scss";

/** Вариант для выбора в фильтре */
export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type DropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  defaultValue: Option | null;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option) => void;
  description?: string;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultValue,
  onChange,
  description = "",
  disabled,
}) => {
  const [listClosed, setListClick] = React.useState<boolean>(true);
  const [choice, setChoice] = React.useState<Option | null>(defaultValue);

  const list = () => {
    if (listClosed) {
      return <></>;
    } else {
      return (
        <div>
          {!disabled &&
            options.map((option) => {
              return (
                <li
                  key={option.key}
                  onClick={() => {
                    changeOption(option);
                  }}
                >
                  <div
                    className={dropdownStyle.dropdown_option}
                  >{`${description} ${option.key}`}</div>
                </li>
              );
            })}
        </div>
      );
    }
  };

  const changeOption: any = (newOption: Option) => {
    if (
      choice === null ||
      (newOption.key !== choice.key && newOption.value !== choice.value)
    ) {
      setChoice(newOption);
      onChange(newOption);
    } else {
      onChange(choice);
    }
  };

  return (
    <div className={dropdownStyle.dropdown}>
      <div
        className={
          listClosed
            ? `${dropdownStyle.dropdown_choice} ${dropdownStyle.dropdown__closed}`
            : `${dropdownStyle.dropdown_choice} ${dropdownStyle.dropdown__opened}`
        }
        onClick={() => setListClick(!listClosed)}
      >
        {choice !== null && `${description} ${choice.key}`}
        {choice === null && `${description}`}
      </div>
      {list()}
    </div>
  );
};
