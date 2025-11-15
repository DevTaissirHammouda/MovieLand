import React from "react";

const MovieCard = ({ movie }) => {
    return (
        <div className="movie">
            <div className="movie-year">
                <p>{movie.Year}</p>
            </div>
            <div className="movie-poster">
                <img 
                    src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/400x600?text=No+Poster"} 
                    alt={movie.Title}
                />
            </div>
            <div className="movie-info">
                <span className="movie-type">{movie.Type}</span>
                <h3 className="movie-title">{movie.Title}</h3>
                <a 
                    href={`https://www.imdb.com/title/${movie.imdbID}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="imdb-link"
                >
                    View on IMDb
                </a>
            </div>
        </div>
    );   
};

export default MovieCard;