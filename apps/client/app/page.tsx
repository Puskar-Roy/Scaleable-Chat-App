"use client";

import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { Button } from "../components/button";
import { ScrollArea } from "../components/ui/scroll-area";

export default function page() {
  const { sendMessage, messages } = useSocket();
  const [message, setmessage] = useState<string>("");
  const handleClick = ({ message }: { message: string }) => {
    sendMessage(message);
    setmessage("");
  };

  const chatRef = useRef(null);

  // Scroll to the bottom of the chat when component mounts or when messages change
  useEffect(() => {
    const chatElement = chatRef.current as unknown as HTMLDivElement;
    chatElement.scrollTop = chatElement.scrollHeight;
  }, [messages]);
  return (
    <div className="w-[80%] h-screen mx-auto flex justify-center items-center flex-col gap-10">
      <div className="w-full flex- justify-center items-center flex-col">
        <h1 className="font-semibold font- text-2xl text-center mb-10">
          Group Messages
        </h1>

        <div ref={chatRef} className="w-[90%] sm:w-[50%] mx-auto overflow-y-auto h-96 bg-gray-100 p-4">
          {messages.reverse().map((data) => (
            <li className="list-none font-medium text-base">{data}</li>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Send a Message!"
          className="rounded-lg bg-slate-200 focus:ring-1 focus:ring-slate-950 text-slate-800 font-semibold"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        />

        {/* <button
          className="px-3 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
          onClick={() => handleClick({ message })}
        >
          Send
        </button> */}
        <Button onClick={() => handleClick({ message })}> Send</Button>
      </div>
    </div>
  );
}
