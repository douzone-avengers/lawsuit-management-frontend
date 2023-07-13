import { atom } from "recoil";

type UiState = {
  loginForm: boolean;
  searchForm: boolean;
};

export const uiState = atom<UiState>({
  key: "uiState",
  default: {
    loginForm: false,
    searchForm: false,
  },
});
