import React from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiStar } from "react-icons/fi";

const MovieCard = ({ movie }) => {
    return (
        <motion.div 
            className="movie"
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="movie-year">
                <p>{movie.Year}</p>
            </div>
            <div className="movie-poster">
                <img 
                    src={movie.Poster} 
                    alt={movie.Title}
                    loading="lazy"
                />
            </div>
            <div className="movie-info">
                <span className="movie-type">{movie.Type}</span>
                <h3 className="movie-title">{movie.Title}</h3>
                <motion.a 
                    href={`https://www.imdb.com/title/${movie.imdbID}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="imdb-link"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FiStar /> View on IMDb <FiExternalLink />
                </motion.a>
            </div>
        </motion.div>
    );   
};

export default MovieCard;