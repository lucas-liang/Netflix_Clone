/*
Component that displays the movies that best match the search term inputted.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Banner from  '../baseComponents/Banner';
import MovieCollection from '../collectionComponents/movies/MovieCollection';
import {searchMovies} from '../script.js';


const SearchTermContainer = (theme) =>{
    const [movieList, setMovieList] = useState([]);

    // using react context
    if(theme === 'light'){
        const genres = document.querySelectorAll('.Genre');
        genres.forEach((genre) =>{
        genre.classList.add('invert');
        })
        const categories = document.querySelectorAll('.Category');
        categories.forEach((category) =>{
        category.classList.add('invert');
        })
        const login = document.querySelector('#LoginIcon');
        login.classList.add('invert');
        const settings = document.querySelector('#SettingsIcon');
        settings.classList.add('invert');
        const allElements = document.querySelectorAll('*');
        allElements.forEach((element) => {
            element.classList.add('light');
        })
    }
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

    return(
        <div>
        <Banner movieList = {movieList}/>
        <MovieCollection movieList = {movieList} />
        </div>
    )
}

export default SearchTermContainer;