/*
Wrapper component that is rendered, displaying movie details, cast and recommendations
when a movie of interest is clicked.  

1.1 - Added ability to favorite and unfavorite movies.

@author Lucas Liang
@version 1.1
@since 19 June 2023
*/

import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { getMovieByID} from '../../script';
import MoviePreview from '../../collectionComponents/movies/MoviePreview';
import { useTheme } from '../../hooks/useTheme';
import { loadTheme } from '../../theme/loadTheme';

const MovieContainer = () =>{
    const [movieInfo, setMovieInfo] = useState({});
    // using navigate from react-router
    let {movieID} = useParams();
    if(movieID === undefined){
        movieID = 603692;
    }
    
    useEffect(() => {
        getMovieData();
    }, [movieID]);
    
    const {isDarkMode} = useTheme();
    
    // grab the data relevant to the movie clicked
    async function getMovieData(){
        let data = await getMovieByID(movieID);
        setMovieInfo(data);
    }

    function runTheme(){
        loadTheme(isDarkMode);
    }

    // ensure that no errors are thrown if data is undefined
    function doesExist(){
        if(Object.keys(movieInfo).length !== 0){
            return(
                <div className = "MovieContainer" onLoad = {runTheme}>
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