import express from "express";
import {
    createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
    

} from "../controllers/Movie.js";

const MovieRouter = express.Router();

MovieRouter.get("/getMovies", getMovies);

MovieRouter.get("/getMovieById", getMovieById);

MovieRouter.post("/createMovie", createMovie);

MovieRouter.put("/updateMovie", updateMovie);

MovieRouter.delete("/deleteMovie", deleteMovie);

export default MovieRouter;