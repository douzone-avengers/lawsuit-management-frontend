import { atom } from "recoil";

type UiState = {
  loginForm: boolean;
  searchForm: boolean;
  cardList: boolean;
};

export const uiState = atom<UiState>({
  key: "uiState",
  default: {
    loginForm: false,
    searchForm: false,
    cardList: true,
  },
});
