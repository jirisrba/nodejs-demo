import express, { Application } from "express";

import { redis } from "./connectors/redisConnection"

import { Movie } from "./db/models/Movie.model";
import { connect } from "./db/db";

// Import core components
import { log } from "./core/helpers";

import { config } from "./config";

async function getRedisCount() {
  let count = Number(redis.get('count'));
  log.debug('get count: ' + count);

  if (count) {
    return count;
  }

  return 0;
}


async function incrRedisCount() {
  let count = Number(getRedisCount);

  // increment count
  redis.set('count', count++);

  log.debug('vote increment: ' + count);
  return count;
}


connect();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get(['/', '/health', '/status'], (req, res) => {
  return res.status(200).json({ status: "UP" });
  });

app.get("/vote", async (req, res) => {
  const count = getRedisCount;
  log.debug("get vote count: " + count)
  res.send({ count: count });
});

app.post("/vote", async (req, res) => {
  const count = incrRedisCount;
  log.info("incr vote count: ", count)
  res.send({ status: 200, data: count });
});


app.post("/movies", async (req, res) => {
  const movie = new Movie();
  movie.title = req.body.title;
  movie.plot_summary = req.body.plot_summary;
  movie.duration = req.body.duration;
  await movie.save();
  res.send(movie);
});

app.get("/movies/:id", async (req, res) => {
  const movie = await Movie.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).send({ message: "Movie not found" });
  }
});

app.listen(config.port, () => {
  log.info("Server listening on port: ", config.port);
});
