import axios from 'axios';
import { useState, useEffect } from 'react';
import { ResultCard } from './ResultCard';

function Add() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios
      .get(`https://www.omdbapi.com/?s=${searchValue}&apikey=148f7e34`)
      .then((response) => {
        if (response.data.Search) {
          setMovies(response.data.Search);
        }
      })
      .catch((error) => console.log(error));
  }, [searchValue]);

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a movie"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {movies.length > 0 && (
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
              {movies.map((movie) => (
                <div key={movie.imdbID} className="col">
                  <ResultCard movie={movie} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Add;
