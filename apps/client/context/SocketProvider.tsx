"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
interface ISocketProvider {
  children: React.ReactNode;
}
interface ISocketContext {
  sendMessage: (msg: string) => any;
}

const SocketContext = React.createContext<ISocketContext | null>(null);

export const useSocket = () => {
  const state = useContext(SocketContext);
  if (!state) {
    throw new Error("State Is Not Defined!");
  }
  return state;
};

export const SocketProvider: React.FC<ISocketProvider> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  
  const sendMessage: ISocketContext["sendMessage"] = useCallback((msg) => {
    console.log("Send Message - ", msg);
    if (socket) {
      socket.emit("event:message", { message: msg });
    }
  }, [socket]);
  useEffect(() => {
    const _socket = io("http://localhost:3003");
    setSocket(_socket);
    return () => {
      _socket.disconnect();
      setSocket(undefined);
    };
  }, []);
  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
