/*
Component that displays the collection of movies for keyword searches.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import './MovieCollection.css';
import Movie from '../../baseComponents/Movie';

const MovieCollection = ({movieList}) => {
    return(
        <div id = "MovieCollection" className = "MovieCollection">
            {movieList.map((movie,idx) => (
            <Movie movie = {movie} key = {movie.id} />
        )) }
        </div>
    );
}



export default MovieCollection;