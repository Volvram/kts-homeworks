import React from "react";

import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import DropDownStore from "../../store/DropdownStore/DropdownStore";
import dropdownStyle from "./Dropdown.module.scss";

/** Вариант для выбора в фильтре */
export type Option = {
  key: string;
  value: string;
  symbol: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type DropdownProps = {
  options: Option[];
  defaultValue: Option;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option) => void;
  description?: string;
  defaultOptionDescription?: string;
  disabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultValue,
  onChange,
  description = "",
  defaultOptionDescription = "",
  disabled = false,
}) => {
  const dropdownStore = useLocalStore(() => new DropDownStore());
  dropdownStore.setOnChange(onChange);

  dropdownStore.setChoice(defaultValue);

  return (
    <div className={dropdownStyle.dropdown}>
      <div
        className={
          dropdownStore.listClosed
            ? `${dropdownStyle.dropdown_choice} ${dropdownStyle.dropdown__closed}`
            : `${dropdownStyle.dropdown_choice} ${dropdownStyle.dropdown__opened}`
        }
        onClick={() => dropdownStore.setListClosed()}
      >
        {dropdownStore.choice !== null &&
          `${description} ${dropdownStore.choice.value}`}
        {dropdownStore.choice === null &&
          `${description} ${defaultOptionDescription}`}
      </div>
      {dropdownStore.listClosed && <></>}
      {!dropdownStore.listClosed && (
        <div>
          {!disabled &&
            options.map((option) => {
              return (
                <li
                  key={option.key}
                  onClick={() => {
                    dropdownStore.setChoice(option);
                  }}
                >
                  <div
                    className={dropdownStyle.dropdown_option}
                  >{`${description} ${option.value}`}</div>
                </li>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default observer(Dropdown);
