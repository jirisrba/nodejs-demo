import express, { Application } from "express";

import { Movie } from "./db/models/Movie.model";
import { connect } from "./db/db";

// Import core components
import { log } from "./core/helpers/Logger";

import "./config";

connect();

const app: Application = express();
const port = Number(parseInt(process.env.PORT) || 3000);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get(['/', '/health', '/status'], (req, res) => {
  console.log('status: "UP"');
  return res.status(200).json({ status: "UP" });
  })

app.post("/movies", async (req, res) => {
  const movie = new Movie();
  movie.title = req.body.title;
  movie.plot_summary = req.body.plot_summary;
  movie.duration = req.body.duration;
  await movie.save();
  res.send(movie);
});

app.get("/movies", async (req, res) => {
  console.info("get movies")
  const movies = await Movie.find();
  res.send(movies);
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

app.listen(port, "0.0.0.0", () => {
  log.info("Server listening on port:", port);
});
