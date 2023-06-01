/*
Component that displays the actor's details, and the other movies they've starred in
after clicking on an actor of interest.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import './ActorDetails.css';
import MovieCollection from '../collectionComponents/movies/MovieCollection'
import {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { getActorDetails } from '../script';


const ActorDetails = (theme) =>{
    const [actorInfo, setActorInfo] = useState({});
    const [movieList, setMovieList] = useState([]);
    // using navigate from react-router
    let actorName = useParams();
    // using context from react
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
    useEffect(() => {getActorInfo()}, [actorName]);
    
    async function getActorInfo(){
        let name = actorName.actorName;
        if(name === ''){
            return;
        }
        const data = await getActorDetails(name);
        const sortedData = findTopTwelve(data.movie_credits.cast);
        setActorInfo(data);
        setMovieList(sortedData);
    }

    // only display the actor's 12 most popular movies if necessary
    function findTopTwelve(movieList){
        if(movieList.length > 12){
            movieList.sort((a, b) => a.popularity < b.popularity ?
            1 : a.popularity > b.popularity ? -1 : 0);
            return movieList.slice(0,12);
        }
        else{
            return movieList;
        }
    }

    // used to ensure no null errors on first load
    function doesExist(){
        if(Object.keys(actorInfo).length !== 0){
            return(
                <div className = "actorContainer">
                <div className = "actorImage">
                <img className = "actorPoster"
                src = {actorInfo.poster_path !== null ?
                `https://image.tmdb.org/t/p/w500${actorInfo.profile_path}`:
                'https://via.placeholder.com/400'}
                alt = {actorInfo.name}
                />
                </div>
                <div className = "actorInfo">
                    <h2>{actorInfo.name}</h2>
                </div>
                <div className = "actorAge">
                    <h2>Born: {actorInfo.birthday}</h2>
                    <div className = "actorHome">
                    <h2>{actorInfo.place_of_birth}</h2>
                    </div>
                </div>
                <div className = "actorBio">
                    {actorInfo.biography}
                </div>
                <MovieCollection movieList = {movieList}/>
            </div>
            )
        }
        else{
            return <></>;
        }
    }
    return(
        doesExist()
    )
}

export default ActorDetails;