/*
Component that displays the movie information, cast, and list of recommended movies
after clicking on a movie of interest.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import {useEffect} from 'react';
import './MoviePreview.css';
import ActorCollection from '../actors/ActorCollection';
import MovieCollection from './MovieCollection';

const MoviePreview = ({movieInfo}) =>{
    
    function findTrailer(){
        let trailerLink = "https://www.youtube.com";
        let videos = movieInfo.videos.results;

        for(let i = 0; i < videos.length; i++){
            let videoType = videos[i].type;
            if(videoType === "Trailer"){
                trailerLink += `/embed/${videos[i].key}`;
                return trailerLink;
            }
        } 
        return trailerLink;
    } 

    return(
        <div className = "moviePreview">
            <div className = "movieContainer">
            <div className = "movieImage">
            <img className = "moviePoster"
            src = {movieInfo.poster_path !== null ?
            `https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`:
                'https://via.placeholder.com/400'}
            alt = {movieInfo.title}
            />
            </div>
            <div id = "movieInfo" className = "movieInfo">
                <h2>{movieInfo.title}</h2>
                <h2>{movieInfo.tagline}</h2>
                <div className = "movieDescription">
                <div className = "ReleaseDate">
                {movieInfo.runtime}&#160;mins&#160;/&#160;{movieInfo.release_date}
                </div>
                <div className = "movieOverview">
                    <h2>Overview:</h2>
                    <br></br>
                {movieInfo.overview}
                </div>
                <div className = "Trailer"> 
                <div className = "TrailerText">Trailer:</div>
                <iframe src= {findTrailer()} frameborder="0" 
                allowFullScreen></iframe>
                </div>
                </div>
            </div>
            </div>
            <div>
                <div className = "cast">Cast:</div>
            <ActorCollection actorList={movieInfo.credits.cast.slice(0,6)}/>
            </div>
            <div>
            <div className = "recommended">Recommended For You:</div>
            <MovieCollection movieList={movieInfo.recommendations.results.slice(0,12)}/>
            </div>
        </div>

    )
}

export default MoviePreview;
