import MovieCollection from "../../collectionComponents/movies/MovieCollection";
import {useLogin} from '../../hooks/useLogin';
import { getFavoriteMovies, getMovieByID } from "../../script";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import { loadTheme } from "../../theme/loadTheme";



const FavoriteMovies = () =>{
    const {username} = useLogin();
    const [movieList, setMovieList] = useState([]);
    let isSet = false;
    const {isDarkMode} = useTheme();

    function runTheme(){
        loadTheme(isDarkMode);
    }

    useEffect(() => {getFavorites()}, [isSet]);

    async function getFavorites(){
        const data = await getFavoriteMovies(username);
        if(data.fetched === 'false'){
            alert("Could not fetch favorite movies");
        }
        else{
            let movieList = [];
            for(let i = 0; i < data.favorite_movies.length; i++){
                let movie = await getMovieByID(data.favorite_movies[i]);
                movieList.push(movie);
            }
            setMovieList(movieList);
            isSet = true;
        }
    }


    return(
        <>
        <div onLoad = {runTheme}>
        <MovieCollection movieList = {movieList}/> 
        </div>
        </>
    )
}

export default FavoriteMovies;