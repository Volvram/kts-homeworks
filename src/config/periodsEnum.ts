export enum PeriodsEnum {
  H24 = "24 H",
  W1 = "1 W",
  M1 = "1 M",
  M6 = "6 M",
  Y1 = "1 Y",
}

export const periodsValues = Object.values(PeriodsEnum).filter((value) =>
  isNaN(Number(value))
);
