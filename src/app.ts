import express from "express";
import cors from "cors";
import helmet from "helmet";

import routes from "./routes";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: ["https://tshepiem.dev", "http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Portfolio API is running");
});

app.use("/api", routes);

export default app;
