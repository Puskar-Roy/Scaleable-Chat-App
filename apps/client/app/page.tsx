"use client";

import { useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function page() {
  const { sendMessage } = useSocket();
  const [message, setmessage] = useState<string>("second");
  return (
    <div>
      <div>
        <h1>Message Application</h1>
      </div>
      <div>
        <input
          type="text"
          placeholder="Send a Message!"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
        <button onClick={(e) => sendMessage(message)}>Send</button>
      </div>
    </div>
  );
}
