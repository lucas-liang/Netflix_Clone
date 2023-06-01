/*
Component that displays the collection of upcoming movies.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import '../MovieCollection.css';
import Movie from '../../../baseComponents/Movie';

const UpcomingCollection = ({movieList}) => {
    return(
        <div id = "MovieCollection" className = "MovieCollection">
            {movieList.map((movie,idx) => (
            <Movie movie = {movie} key = {movie.id} />
        )) }
        </div>
    );
}



export default UpcomingCollection;