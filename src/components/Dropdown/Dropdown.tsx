import React from "react";

import DropDownStore from "@store/DropdownStore/DropdownStore";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";

/** Вариант для выбора в фильтре */
export type Option = {
  key: string;
  value: string;
  symbol: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type DropdownProps = {
  options: Option[];
  defaultValue?: Option;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option) => void;
  description?: string;
  defaultOptionDescription?: string;
  disabled?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultValue = null,
  onChange,
  description = "",
  defaultOptionDescription = "",
  disabled = false,
}) => {
  const dropdownStore = useLocalStore(() => new DropDownStore());
  dropdownStore.setOnChange(onChange);

  dropdownStore.setChoice(defaultValue);

  return (
    <div className={styles.dropdown}>
      <div
        className={
          dropdownStore.listClosed
            ? `${styles.dropdown_choice} ${styles.dropdown__closed}`
            : `${styles.dropdown_choice} ${styles.dropdown__opened}`
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
                    className={styles.dropdown_option}
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
