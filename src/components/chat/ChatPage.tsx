import { useEffect, useState } from "react";
import socket from "./socket.ts";

type ResponseType = {
  id: number;
  senderName: string;
  message: string;
};

function App() {
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<ResponseType[]>([]);

  const onConnect = () => {
    console.log("connect");
  };
  const onDisconnect = () => {
    console.log("disconnect");
  };
  const onMessageReceive = (res: ResponseType) => {
    console.log("messageReceive");
    console.dir(res);
    setChats((prev) => [...prev, res]);
  };

  const onTest = (res: unknown) => {
    console.log("test");
    console.dir(res);
  };

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessageReceive);
    socket.on("test", onTest);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessageReceive);
      socket.off("test", onTest);
    };
  }, []);

  const handleToSendMessage = () => {
    setMessage("");
    socket.emit(
      "message",
      {
        senderName,
        message,
      },
      (res: ResponseType) => {
        console.log(res);
      },
    );
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        {chats.map((item) => (
          <div key={item.id} style={{ display: "flex", gap: 2 }}>
            <div>{item.senderName}</div>
            <div>{item.message}</div>
          </div>
        ))}
      </div>

      <div>
        <div>
          <button onClick={() => socket.connect()}>Connect</button>
          <button onClick={() => socket.disconnect()}>Disconnect</button>
        </div>
        <input
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleToSendMessage();
            }
          }}
        />
        <button
          onClick={() => {
            handleToSendMessage();
          }}
        >
          submit
        </button>
      </div>
    </div>
  );
}

export default App;
