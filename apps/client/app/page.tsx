"use client";

import { useState } from "react";
import { useSocket } from "../context/SocketProvider";

export default function page() {
  const { sendMessage, messages } = useSocket();
  const [message, setmessage] = useState<string>("");
  const handleClick = ({ message }: { message: string }) => {
    sendMessage(message);
    setmessage("");
  };
  return (
    <div className="w-[80%] h-screen mx-auto flex justify-center items-center flex-col">
      <div>
        <h1>Message Application</h1>
        {messages.map((data) => (
          <li className="">{data}</li>
        ))}
      </div>
      <div className="">
        <input
          type="text"
          placeholder="Send a Message!"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />
        <button onClick={() => handleClick({ message })}>Send</button>
      </div>
    </div>
  );
}
