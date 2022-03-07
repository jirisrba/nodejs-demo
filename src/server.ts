import express, { Application } from "express";

// Import core components
import { logger } from "./core/helpers";
import { config } from "./config";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get(['/', '/health', '/status'], (req, res) => {
  return res.status(200).json({ status: "UP" });
  });

app.listen(config.port, () => {
  logger.info("Server listening on port: ", config.port);
});
