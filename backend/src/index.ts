import express from "express";
import cors from "cors";

import { PORT } from "./env-variables";

import chatRouter from "./routes/chat";
import userRouter from "./routes/user";
import { connectDB } from "./configs/mongodb";

const port = PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chats", chatRouter);
app.use("/users", userRouter);

connectDB().then(() => {
  app.listen(port, () => console.log("Server running on", port));
});
