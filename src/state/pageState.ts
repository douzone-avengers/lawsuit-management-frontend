import { atom } from "recoil";

type Page = {
  paths: string[];
  params: Record<string, string>;
};

export const pageState = atom<Page>({
  key: "pageState",
  default: {
    paths: [],
    params: {},
  },
});
