import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilm, FiTv, FiVideo } from "react-icons/fi";
import './App.css';
import 'animate.css';
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
                // Filter out movies without posters
                const moviesWithPosters = data.Search.filter(movie => movie.Poster && movie.Poster !== 'N/A');
                setMovies(moviesWithPosters);
                if (moviesWithPosters.length === 0) {
                    setError('No results with images found');
                } else {
                    setError(null);
                }
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
            <motion.header 
                className="app-header"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="header-content">
                    <motion.h1 
                        className="app-title"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        <span className="icon">🎬</span>
                        MovieLand
                    </motion.h1>
                    <p className="app-subtitle">Discover your favorite movies and TV shows</p>
                </div>
            </motion.header>

            <motion.div 
                className="search-section"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="search-container">
                    <div className="search-box">
                        <FiSearch className="search-icon-left" />
                        <input 
                            placeholder="Search for movies, series, episodes..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="search-input"
                        />
                        <motion.button 
                            onClick={() => searchMovies(searchTerm)} 
                            className="search-button"
                            disabled={loading}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiSearch />
                        </motion.button>
                    </div>

                    <div className="filter-buttons">
                        <motion.button 
                            className={`filter-btn ${searchType === 'movie' ? 'active' : ''}`}
                            onClick={() => setSearchType('movie')}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiFilm /> Movies
                        </motion.button>
                        <motion.button 
                            className={`filter-btn ${searchType === 'series' ? 'active' : ''}`}
                            onClick={() => setSearchType('series')}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiTv /> Series
                        </motion.button>
                        <motion.button 
                            className={`filter-btn ${searchType === 'episode' ? 'active' : ''}`}
                            onClick={() => setSearchType('episode')}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiVideo /> Episodes
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            <div className="results-section">
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div 
                            className="loading"
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="loader"></div>
                            <p>Searching for {searchType}s...</p>
                        </motion.div>
                    ) : error ? (
                        <motion.div 
                            className="error"
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <span className="error-icon">⚠️</span>
                            <h2>{error}</h2>
                            <p>Try searching for something else</p>
                        </motion.div>
                    ) : movies?.length > 0 ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div 
                                className="results-header"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2>Found {movies.length} results</h2>
                            </motion.div>
                            <div className="container">
                                {movies.map((movie, index) => (
                                    <motion.div
                                        key={movie.imdbID}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                    >
                                        <MovieCard movie={movie} />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            className="empty"
                            key="empty"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <span className="empty-icon">🎭</span>
                            <h2>No {searchType}s found</h2>
                            <p>Try a different search term</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <footer className="app-footer">
                <p>Powered by OMDb API</p>
            </footer>
        </div>
    );
};

export default App;