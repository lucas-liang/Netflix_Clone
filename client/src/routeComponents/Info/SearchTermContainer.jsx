/*
Component that displays the movies that best match the search term inputted.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Banner from  '../../baseComponents/Banner';
import MovieCollection from '../../collectionComponents/movies/MovieCollection';
import {searchMovies} from '../../script.js';
import { loadTheme } from '../../theme/loadTheme';
import { useTheme } from '../../hooks/useTheme';




const SearchTermContainer = () =>{
    const [movieList, setMovieList] = useState([]);

    // using navigate from react-router
    let {searchTerm} = useParams();

    // assign default for home page
    if(searchTerm === undefined){
        searchTerm = 'iron';
    }

    useEffect(() => {getMovies()}, [searchTerm]);

    // grab the movies that best match the search term
    async function getMovies(){
        let data = await searchMovies(searchTerm);
        setMovieList(data);
    }

    const {isDarkMode} = useTheme();


    function runTheme(){
        loadTheme(isDarkMode);
    }
    return(
        <div onLoad = {runTheme}>
        <Banner movieList = {movieList}/>
        <MovieCollection movieList = {movieList} />
        </div>
    )
}

export default SearchTermContainer;