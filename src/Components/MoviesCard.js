import React from 'react';
import '../styles.css';

export default function MoviesCard({ movie, isWatchlisted, toggleWatchlist }) {
  const getRatingClass = (rating) => {
    if (rating >= 8) return 'rating-good';
    if (rating >= 5 && rating < 8) return 'rating-ok';
    return 'rating-bad';
  };

  return (
    <div key={movie.id} className='movie-card'>
      <img src={`images/${movie.image}`} alt={movie.title} />
      <div className='movie-card-info'>
        <h3 className='movie-card-title'>{movie.title}</h3>
        <span className='movie-card-genre'>{movie.genre}</span>
        <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
          {movie.rating}
        </span>
      </div>

      {/* Watchlist Toggle */}
      <label className="switch">
        <input
          type="checkbox"
          checked={isWatchlisted}
          onChange={() => toggleWatchlist(movie)}
        />
        <span className="slider">
          <span className="slider-label">
            {isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
          </span>
        </span>
      </label>
    </div>
  );
}
