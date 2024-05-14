import { Server } from "socket.io";
import { Redis } from "ioredis";
import { config } from "../config/config";

const pub = new Redis({
  host: config.HOST,
  username: config.USERNAME,
  port: config.PORT,
  password: config.PASSWORD,
});
const sub = new Redis({
  host: config.HOST,
  username: config.USERNAME,
  port: config.PORT,
  password: config.PASSWORD,
});

class SocketService {
  private _io: Server;

  constructor() {
    console.log("Init Socket Server");
    this._io = new Server({
      cors: {
        origin: `*`,
        credentials: true,
        methods: ["GET", "POST"],
      },
    });
    sub.subscribe("MESSAGES");
  }
  public initListners() {
    const io = this._io;
    io.on("connect", async (socket) => {
      console.log("New Socket Connected! ", socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New Message - ", message);
        await pub.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    sub.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        io.emit("message", message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
