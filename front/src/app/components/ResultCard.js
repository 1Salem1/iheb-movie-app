import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const ResultCard = ({ movie }) => {
  const { MoviesDispatch, watchlist, watched } = useContext(GlobalContext);

  const storedMovie = watchlist.find((o) => o.imdbID === movie.imdbID);
  const storedMovieWatched = watched.find((o) => o.imdbID === movie.imdbID);

  const watchlistDisabled = storedMovie ? true : storedMovieWatched ? true : false;

  const watchedDisabled = storedMovieWatched ? true : false;

  return (
    <div className="card result-card">
      <div className="position-relative">
        <img
          src={movie.Poster}
          className="card-img-top"
          alt={movie.Title}
          onError={(e) => (e.target.src = '/no-image.png')}
        />
        {watchlistDisabled && (
          <div className="position-absolute top-0 start-0 bg-warning text-dark p-2">
            Added to watchlist
          </div>
        )}
        {watchedDisabled && (
          <div className="position-absolute top-0 start-0 bg-success text-white p-2">
            Watched
          </div>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">{movie.Title}</h5>
        <p className="card-text">{movie.Year}</p>
        <div className="d-flex justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            disabled={watchlistDisabled}
            onClick={() =>
              MoviesDispatch({
                type: 'ADD_MOVIE_TO_WATCHLIST',
                payload: movie,
              })
            }
          >
            Add to Watchlist
          </button>
          <button
            className="btn btn-outline-success"
            disabled={watchedDisabled}
            onClick={() =>
              MoviesDispatch({
                type: 'ADD_MOVIE_TO_WATCHED',
                payload: movie,
              })
            }
          >
            Add to Watched
          </button>
        </div>
      </div>
    </div>
  );
};
