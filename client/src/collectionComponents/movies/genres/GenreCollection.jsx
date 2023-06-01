/*
Component that displays the collection of movies for genres.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/


import '../MovieCollection.css';
import Movie from '../../../baseComponents/Movie';

const GenreCollection = ({movieList}) => {
    return(
        <div id = "MovieCollection" className = "MovieCollection">
            {movieList.results.map((movie,idx) => (
            <Movie movie = {movie} key = {movie.id} />
        )) }
        </div>
    );
}



export default GenreCollection;