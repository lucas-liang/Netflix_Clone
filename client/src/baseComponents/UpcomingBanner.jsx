/*
Component that finds a find random movie to feature and display, specificially for the upcoming category.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import './Banner.css';
import {useNavigate} from 'react-router';


const UpcomingBanner = ({movieList}) => {
    const navigate = useNavigate();

    function handleClick(event){
        navigate(`/movie/${movie.id}`);
    }

    let movie = null;
    if(movieList.length === 0){
        return(
            <></>
        )
    }
    while(true){
        let randomIdx = Math.floor(Math.random() * movieList.length);
        if(movieList[randomIdx].backdrop_path !== null){
            movie = movieList[randomIdx];
            break;
        }
    }
    return(
        <div id = "Banner">
            <img className = "BannerImage" id = {movie.id} onClick = {handleClick}
            src = {`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt = {movie.title}
            />
            <div id = "Description">
                <h3>{movie.title}</h3>
                {movie.overview}
            </div>
        </div>
    )

}

export default UpcomingBanner;