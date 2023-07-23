import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Row.css';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

function Row(props) {
    const [movies, setMovies] = useState([]);
    const baseURL = "https://api.themoviedb.org/3";
    const imageUrl = "https://image.tmdb.org/t/p/original";
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const re = baseURL + props.fetchUrl;
            const request = await axios.get(re);   
            setMovies(request.data.results);    
            return request;
        }
        fetchData();
    },);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        // console.log(movie)
        if(trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name)
            .then(url => {
                // console.log(url)
                const urlParam = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParam.get("v"));
            }).catch(error => console.log(error))
        }
    }

    // console.table(movies)
    return (
        <div className='row'>
            <h2>{props.title}</h2>            

            <div className="row_posters">
                {movies.map(movie => (
                    <img onClick={() => handleClick(movie)} className={`row_poster ${props.isLargeRow && "row_poster_large"}`} key={movie.id} src={`${imageUrl}${props.isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.title?movie.title:movie.name}/>
                )                 
                )}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} /> }
        </div>
    )
}

export default Row
