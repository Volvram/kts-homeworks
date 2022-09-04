import { encode, toUnicode } from "punycode";

import { Option } from "@components/Dropdown/Dropdown";

export const CURRENCIES: Option[] = [
  {
    key: "usd",
    value: "USD",
    symbol: "\u{0024}", // $
  },
  {
    key: "eur",
    value: "EUR",
    symbol: "\u{20AC}", // €
  },
  {
    key: "rub",
    value: "RUB",
    symbol: "\u{20BD}", // ₽
  },
];
