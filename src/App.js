import React, { useState } from "react";
import {useEffect} from "react"
import './App.css';
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
const API_url = "http://www.omdbapi.com/?apikey=4dd09de4";

const App = ()=>{
    const [movies,setMovies]=useState([]);
    const [searchTerm,setSearchTerm]=useState('');
    const searchMovies = async(title)=>{
        const response =await fetch(`${API_url}&s=${title}`);
        const data =await response.json();
        setMovies(data.Search);
    }
useEffect(()=>{
searchMovies("spider");

},[])

return (
    <div className="app">
        <h1>
            MovieLand
        </h1>
        <div className="search">
            <input placeholder="Search for Movie" value={searchTerm } onChange={(e)=> setSearchTerm(e.target.value)}/>
            <img src={SearchIcon} alt="search icon" onClick={()=>searchMovies(searchTerm)}/>
        </div>
        {
            movies?.length>0
            ?(<div className="container">
                {
                    movies.map((movie)=>
                    (
                        <MovieCard movie={movie}/>
                    )
                )
                }


</div>):
(<div className="empty">
    <h2> no movie found</h2>
</div>)
        }

    </div>
    );

}
export default App;