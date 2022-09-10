import React from "react";

import DropDownStore from "store/DropdownStore/DropdownStore";
import { useLocalStore } from "utils/useLocalStore";
import cn from "classnames";
import cnBind from "classnames/bind";
import { observer } from "mobx-react-lite";

import styles from "./styles.module.scss";

const cx = cnBind.bind(styles);

/** Вариант для выбора в фильтре */
export type OptionType = {
  key: string;
  value: string;
  symbol: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type DropdownProps = {
  options: OptionType[];
  defaultValue?: OptionType;
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: OptionType) => void;
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
  const dropdownStore = useLocalStore(
    () => new DropDownStore(defaultValue, onChange)
  );

  const handleList = React.useCallback(() => {
    dropdownStore.toggleListClosed();
  }, []);

  const handleChoice = React.useCallback((option: OptionType) => {
    return (event: React.MouseEvent) => {
      dropdownStore.setChoice(option);
    };
  }, []);

  return (
    <div className={styles.dropdown}>
      <div
        className={cn(
          cx({
            dropdown_choice: true,
            dropdown__closed: dropdownStore.listClosed,
            dropdown__opened: !dropdownStore.listClosed,
          })
        )}
        onClick={handleList}
      >
        {dropdownStore.choice
          ? `${description} ${dropdownStore.choice.value}`
          : `${description} ${defaultOptionDescription}`}
      </div>
      {!dropdownStore.listClosed && (
        <div className={styles.dropdown_options_container}>
          {!disabled &&
            options.map((option) => {
              return (
                <li key={option.key} onClick={handleChoice(option)}>
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
