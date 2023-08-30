import { atom } from "recoil";

type PrintLoadingType = {
  text: string;
  isLoading: boolean;
};

const printLoadingState = atom<PrintLoadingType>({
  key: "printLoadingState",
  default: {
    text: "",
    isLoading: false,
  },
});

export default printLoadingState;
