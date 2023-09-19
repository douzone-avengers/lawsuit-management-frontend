import { io } from "socket.io-client";

const socket = io(
  import.meta.env.DEV
    ? "http://localhost:7777"
    : "https://lawsuit-management-api.store:7778",
);

export default socket;
