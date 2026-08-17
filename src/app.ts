import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      process.env.DEV_FRONTEND_URL,
      process.env.DEV_FRONTEND_URL_ALT,
    ].filter((url): url is string => Boolean(url)),
    methods: ["GET", "POST"],
  }),
);

app.use(
  "/api/webhooks/resend",
  express.raw({
    type: "application/json",
  }),
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Portfolio API is running");
});

app.use("/api", routes);

export default app;
