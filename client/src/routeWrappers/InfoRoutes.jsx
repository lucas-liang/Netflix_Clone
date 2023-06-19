/*
React Component that contains all routes related to grabbing movie
and actor info.

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/

import GenreContainer from "../routeComponents/Info/GenreContainer";
import MovieContainer from "../routeComponents/Info/MovieContainer";
import ActorDetails from "../routeComponents/Info/ActorDetails";
import SearchTermContainer from "../routeComponents/Info/SearchTermContainer";
import FavoriteActors from "../routeComponents/Info/FavoriteActors";
import FavoriteMovies from "../routeComponents/Info/FavoriteMovies";
import { Routes, Route } from "react-router";
import Header from "../baseComponents/header/Header";
import Sidebar from "../baseComponents/sidebar/Sidebar";
import NotFound from "../routeComponents/Info/NotFound";

const InfoRoutes = () =>{

    return(
        <>
        <Sidebar/>
        <div id = 'Container'>
            <div id = 'ContainerScroll'>
            <Header />
            <Routes>
                <Route path = 'actor/:actorName' element = {<ActorDetails/>}/>
                <Route path = 'search/:searchTerm' element = {<SearchTermContainer/>}/>
                <Route path = 'movie/:movieID' element = {<MovieContainer/>}/>
                <Route path = 'genre/:genre' element = {<GenreContainer/>}/>
                <Route path = 'favoriteMovies' element = {<FavoriteMovies/>}/>
                <Route path = 'favoriteActors' element = {<FavoriteActors/>}/>
                <Route path = "*" element = {<NotFound/>}/>
            </Routes>
            </div>
        </div>
        </>
    )
}

export default InfoRoutes;