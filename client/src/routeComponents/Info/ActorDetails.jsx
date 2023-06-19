/*
Component that displays the actor's details, and the other movies they've starred in
after clicking on an actor of interest.

1.1 - Added ability to favorite and unfavorite actors

@author Lucas Liang
@version 1.1
@since 19 June 2023
*/

import './ActorDetails.css';
import MovieCollection from '../../collectionComponents/movies/MovieCollection';
import {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { getActorDetails, isFavoriteActor, addFavoriteActor, removeFavoriteActor } from '../../script';
import Favorite from '../../assets/images/favorite.svg';
import { useLogin } from '../../hooks/useLogin';
import {loadTheme} from '../../theme/loadTheme'
import { useTheme } from '../../hooks/useTheme';


const ActorDetails = () =>{
    const [actorInfo, setActorInfo] = useState({});
    const [movieList, setMovieList] = useState([]);
    // using context from react
    const {username} = useLogin();
    let actorName = useParams();

    useEffect(() => {getActorInfo()}, [actorName]);
    const {isDarkMode} = useTheme();
    
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

    // add an actor to the user's favorite_actors list
    async function addFavorite(actorID){
        const data = await addFavoriteActor(username, actorID);
        if(data.added === 'true'){
            alert('Added to your favorites!');
        }
        else{
            alert('Failed to add your favorites.');
        }
    }

    // remove an actor from the user's favorite_actors list
    async function removeFavorite(actorID){
        const data = await removeFavoriteActor(username, actorID);
        if(data.removed === 'true'){{
            alert('Removed from your favorites.');
        }}
        else{
            alert('Failed to remove from favorites.');
        }
    }

    // see if an actor has been favorited or not
    async function isFavorite(event){
        const actorID = document.querySelector('.favoriteWrapper').id;
        const data = await isFavoriteActor(username, actorID);
        if(data.found === 'true'){
            removeFavorite(actorID);
        }
        else{
            addFavorite(actorID);
        }
    }

    function runTheme(){
        loadTheme(isDarkMode);
    }

    // used to ensure no null errors on first load
    function doesExist(){
        if(Object.keys(actorInfo).length !== 0){
            return(
                <div id = 'Container'>
                <div id = 'ContainerScroll'>
                <div className = "actorContainer" onLoad={runTheme}>
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
                <div className = "actorData">
                    <div className = "actorAge">
                    <h2>Born: {actorInfo.birthday}</h2>
                    </div>
                    <div className = 'favoriteWrapper' id = {actorInfo.id}>
                    <img id = "favoriteActor" className = 'favoriteActor'
                    src = {Favorite}
                    alt = "Favorite Button"
                    onClick = {isFavorite}
                    />
                    </div>
                    <div className = "actorHome">
                    <h2>{actorInfo.place_of_birth}</h2>
                    </div>
                </div>
                <div className = "actorBio">
                    {actorInfo.biography}
                </div>
                <MovieCollection movieList = {movieList}/>
            </div>
            </div>
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