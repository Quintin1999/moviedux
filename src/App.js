import React, { useState, useEffect } from 'react';
import './styles.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import MoviesGrid from './Components/MoviesGrid';
import Watchlist from './Components/Watchlist';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App () {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  useEffect(() => {
    fetch("movies.json")
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error("Error fetching movies:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movie) => {
    setWatchlist((prev) => {
      const isInWatchlist = prev.some((m) => m.id === movie.id);
      return isInWatchlist
        ? prev.filter((m) => m.id !== movie.id) 
        : [...prev, movie]; 
    });
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route 
              path="/" 
              element={
                <MoviesGrid 
                  movies={movies} 
                  watchlist={watchlist} 
                  toggleWatchlist={toggleWatchlist} 
                />
              } 
            />
            <Route 
              path="/watchlist" 
              element={
                <Watchlist 
                  watchlist={watchlist} 
                  toggleWatchlist={toggleWatchlist} 
                />
              } 
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
