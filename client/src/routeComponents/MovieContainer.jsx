/*
Wrapper component that is rendered, displaying movie details, cast and recommendations
when a movie of interest is clicked.  

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { getMovieByID} from '../script';
import MoviePreview from '../collectionComponents/movies/MoviePreview';

const MovieContainer = (theme) =>{
    const [movieInfo, setMovieInfo] = useState({});
    // using navigate from react-router
    let {movieID} = useParams();
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
    if(movieID === undefined){
        movieID = 603692;
    }
    
    useEffect(() => {
        getMovieData();
    }, [movieID]);
    
    
    // grab the data relevant to the movie clicked
    async function getMovieData(){
        let data = await getMovieByID(movieID);
        setMovieInfo(data);
    }

    // ensure that no errors are thrown if data is undefined
    function doesExist(){
        if(Object.keys(movieInfo).length !== 0){
            return(
            <div className = "MovieContainer">
            <MoviePreview movieInfo = {movieInfo}/>
            </div>
            )
        }
        else{
            return <></>;
        }
    }
    return(
        doesExist()

    );

}

export default MovieContainer;