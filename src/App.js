import React, { useState, useEffect } from "react";
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_url = "https://www.omdbapi.com/?apikey=4dd09de4";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchType, setSearchType] = useState('movie');

    const searchMovies = async (title) => {
        if (!title.trim()) {
            setError('Please enter a search term');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`${API_url}&s=${title}&type=${searchType}`);
            const data = await response.json();

            if (data.Response === 'True') {
                setMovies(data.Search);
                setError(null);
            } else {
                setMovies([]);
                setError(data.Error || 'No results found');
            }
        } catch (err) {
            setError('Failed to fetch movies. Please try again.');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            searchMovies(searchTerm);
        }
    };

    useEffect(() => {
        searchMovies("Marvel");
    }, []);

    return (
        <div className="app">
            <header className="app-header">
                <div className="header-content">
                    <h1 className="app-title">
                        <span className="icon">🎬</span>
                        MovieLand
                    </h1>
                    <p className="app-subtitle">Discover your favorite movies and TV shows</p>
                </div>
            </header>

            <div className="search-section">
                <div className="search-container">
                    <div className="search-box">
                        <input 
                            placeholder="Search for movies, series, episodes..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="search-input"
                        />
                        <button 
                            onClick={() => searchMovies(searchTerm)} 
                            className="search-button"
                            disabled={loading}
                        >
                            <img src={SearchIcon} alt="search" />
                        </button>
                    </div>

                    <div className="filter-buttons">
                        <button 
                            className={`filter-btn ${searchType === 'movie' ? 'active' : ''}`}
                            onClick={() => setSearchType('movie')}
                        >
                            🎬 Movies
                        </button>
                        <button 
                            className={`filter-btn ${searchType === 'series' ? 'active' : ''}`}
                            onClick={() => setSearchType('series')}
                        >
                            📺 Series
                        </button>
                        <button 
                            className={`filter-btn ${searchType === 'episode' ? 'active' : ''}`}
                            onClick={() => setSearchType('episode')}
                        >
                            🎞️ Episodes
                        </button>
                    </div>
                </div>
            </div>

            <div className="results-section">
                {loading ? (
                    <div className="loading">
                        <div className="loader"></div>
                        <p>Searching for {searchType}s...</p>
                    </div>
                ) : error ? (
                    <div className="error">
                        <span className="error-icon">⚠️</span>
                        <h2>{error}</h2>
                        <p>Try searching for something else</p>
                    </div>
                ) : movies?.length > 0 ? (
                    <>
                        <div className="results-header">
                            <h2>Found {movies.length} results</h2>
                        </div>
                        <div className="container">
                            {movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="empty">
                        <span className="empty-icon">🎭</span>
                        <h2>No {searchType}s found</h2>
                        <p>Try a different search term</p>
                    </div>
                )}
            </div>

            <footer className="app-footer">
                <p>Powered by OMDb API</p>
            </footer>
        </div>
    );
};

export default App;