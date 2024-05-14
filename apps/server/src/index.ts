import express, { Request, Response, NextFunction, Express } from "express";
;

const app: Express = express();
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "API IS WORKING 🥳" });
});

app.listen(3003, () => {
  console.log(`[⚡] Server Is Running on http://localhost:3003`);
});


