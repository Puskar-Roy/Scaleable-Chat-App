import express, { Request, Response, NextFunction, Express } from "express";
import SocketService from "./services/socket";
import http from "http";

const app: Express = express();
app.use(express.json());

const server = http.createServer(app);

const socketService = new SocketService();
socketService.io.attach(server);
app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "API IS WORKING 🥳" });
});

socketService.initListners();
server.listen(3003, () => {
  console.log(`[⚡] Server Is Running on http://localhost:3003`);
});
