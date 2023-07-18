import { atom } from "recoil";
import { CardItem } from "../component/Card";

export const cardsState = atom<CardItem[]>({
  key: "cardsState",
  default: [],
});
