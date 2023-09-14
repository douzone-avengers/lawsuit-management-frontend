import { io } from "socket.io-client";

const socket = io(
  import.meta.env.DEV ? "http://localhost:7777" : "https://52.79.44.141:7777",
);

export default socket;
