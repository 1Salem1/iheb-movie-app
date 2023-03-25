import mongoose from "mongoose";
import axios from "axios";

// Define the MovieSchema
const MovieSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  decription: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  author: {
    type: String,
    required: true,
    min: 5,
  },
  duree: {
    type: String,
    required: true,
    min: 5,
  },
  anneedesortie: {
    type: String,
    required: true,
    min: 5,
  },
  genre: {
    type: String,
    required: true,
    min: 5,
  },
  image: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  rating: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
}, { timestamps: true });


  /*axios.get('http://www.omdbapi.com/?s=avengers&apikey=24092fe8')
  .then((response) => {
    console.log(response);
    if (response.data.Response === "True") {
      response.data.Search.forEach((movieData) => {
         const movie = new Movie({
          titre: movieData.Title,
          decription: movieData.Plot,
          author: movieData.Director,
          duree: movieData.Runtime,
          anneedesortie: movieData.Year,
          genre: movieData.Genre,
          image: movieData.Poster,
          rating: movieData.imdbRating,
        });

        movie.save()
          .then(() => console.log('Saved movie to database:', movie.titre))
          .catch((err) => console.error('Error saving movie:', err));
      });
    } else {
      console.error('Error fetching movies:', response.data.Error);
    }
  })
  .catch((err) => console.error('Error fetching movies:', err));

*/

const Movie = mongoose.model("Movie", MovieSchema);
export default Movie;
