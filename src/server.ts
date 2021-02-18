import express, { Application } from "express";

// import { redis } from "./connectors/redisConnection"

// import { Movie } from "./db/models/Movie.model";
// import { connect } from "./db/db";

// Import core components
import { listMyBuckets, log } from "./core/helpers";
import { config } from "./config";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get(['/', '/health', '/status'], (req, res) => {
  return res.status(200).json({ status: "UP" });
  });

app.get("/vote", async (req, res) => {
  const count = 1;
  log.debug("get vote count: " + count)
  log.debug("s3_endpoint: " + config.s3_endpoint);
  res.send({ count: count });
});

app.get("/s3", async (req, res) => {
  listMyBuckets;
  res.send({ count: config.s3_endpoint });
});

app.listen(config.port, () => {
  log.info("Server listening on port: ", config.port);
});
