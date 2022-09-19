import loader_l from "assets/img/loader_l.svg";
import loader_m from "assets/img/loader_m.svg";
import loader_s from "assets/img/loader_s.svg";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export const loaderSVGmap: Record<LoaderSize, string> = {
  [LoaderSize.s]: loader_s,
  [LoaderSize.m]: loader_m,
  [LoaderSize.l]: loader_l,
};
