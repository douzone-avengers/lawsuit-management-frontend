import { atom } from "recoil";

type LoadingType = {
  text: string;
  isLoading: boolean;
};

const loadingState = atom<LoadingType>({
  key: "loadingState",
  default: {
    text: "",
    isLoading: false,
  },
});

export default loadingState;
