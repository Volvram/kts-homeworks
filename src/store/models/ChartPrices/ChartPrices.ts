import { MONTHS } from "config/months";
import { WEEKDAYS } from "config/weekdays";

export type ChartPricesApi = [timestamp: number, price: number];

export type ChartPricesModel = {
  date: string;
  price: number;
};

export const filterChartPricesByMinutes = (from: ChartPricesApi): boolean => {
  return (
    new Date(from[0]).getMinutes() >= 0 && new Date(from[0]).getMinutes() < 5
  );
};

export const filterChartPricesByHours = (
  from: ChartPricesApi,
  days: number
): boolean => {
  return new Date(from[0]).getHours() === 0;
};

export const filterChartPricesByDays = (
  from: ChartPricesApi,
  days: number
): boolean => {
  return new Date(from[0]).getDate() === 1;
};

export const normalizeChartPricesByH24 = (
  from: ChartPricesApi
): ChartPricesModel => {
  return {
    date: `${new Date(from[0]).getHours()}:0${new Date(from[0]).getMinutes()}`,
    price: from[1],
  };
};

export const normalizeChartPricesByW1 = (
  from: ChartPricesApi
): ChartPricesModel => {
  const day = WEEKDAYS[new Date(from[0]).getDay()];
  return {
    date: day,
    price: from[1],
  };
};

export const normalizeChartPricesByM1 = (
  from: ChartPricesApi
): ChartPricesModel => {
  const month = MONTHS[new Date(from[0]).getMonth()];
  return {
    date: `${new Date(from[0]).getDate()} ${month}`,
    price: from[1],
  };
};

export const normalizeChartPricesByM6 = (
  from: ChartPricesApi
): ChartPricesModel => {
  const month = MONTHS[new Date(from[0]).getMonth()];
  return {
    date: month,
    price: from[1],
  };
};

export const normalizeChartPricesByY1 = (
  from: ChartPricesApi
): ChartPricesModel => {
  const month = MONTHS[new Date(from[0]).getMonth()];
  return {
    date: month,
    price: from[1],
  };
};
