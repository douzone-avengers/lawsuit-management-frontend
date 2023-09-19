import { io } from "socket.io-client";

const socket = io(
  import.meta.env.DEV
    ? "http://localhost:7777"
    : "https://lawsuit-management-api.store:7777",
);

export default socket;
