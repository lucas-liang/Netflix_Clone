/*
Component that displays the image, title, and rating for a movie.

1.1 - navigate Route changed

@author Lucas Liang
@version 1.1
@since 19 June 2023
*/

import '../collectionComponents/movies/MovieCollection.css'
import {useNavigate} from 'react-router-dom';
const Movie = ({movie}) => {
    
    const navigate = useNavigate();
    function handleClick(event){
        navigate(`/info/movie/${movie.id}`);
    }
        
    return(
        <div className = "Movie" id = {movie.id} 
        onClick = {handleClick}>
            <img className = "MoviePoster"
            src = {movie.poster_path !== null ?
                `https://image.tmdb.org/t/p/w500/${movie.poster_path}`:
                    'https://via.placeholder.com/400'}
            alt = {movie.title}
            />
            <h2>{movie.title}</h2>
            <p>{movie.vote_average}</p>
        </div>
    );
}


export default Movie;