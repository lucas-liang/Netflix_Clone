/*
A netflix-esque clone using MongoDB (via Mongoose),
React (with react-router), Express (with express routes), 
and node (with node-fetch and node-cache).
Uses the TMDB API to get the relevant information and 
a custom CRUD API for user database calls.

1.1 - Added Database functionality, refactored code.

@author Lucas Liang
@version 1.1
@since 19 June 2023
*/

import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {LoginProvider} from './login/LoginProvider';
import InfoRoutes from './routeWrappers/InfoRoutes';
import UserRoutes from './routeWrappers/UserRoutes';
import Home from './routeComponents/Info/Home';
import { ThemeProvider } from './theme/ThemeProvider';
import NotFound from './routeComponents/Info/NotFound';
const App = () =>{
    // for partial hydration, page switches, and passing parameters, react-router was used.
    // Context providers simplify the implementation of theme and login.
    return(
        <BrowserRouter>
            <LoginProvider>
            <ThemeProvider>
            <div id = "App">
                <Routes>
                    <Route index element = {<Home/>}/>
                    <Route path = '/info/*' index element = {<InfoRoutes/>}/>
                    <Route path = '/user/*' index element = {<UserRoutes/>}/>
                    <Route path = "*" element = {<NotFound/>}/>
                </Routes>
            </div>
            </ThemeProvider>
            </LoginProvider>
       </BrowserRouter>
    );
}


export default App;

/* <ThemeProvider>
        <>
        <Sidebar />
        <div id = 'Container'>
            <div id = 'ContainerScroll'>
            <Header/>
            <Route path = '/' element = {<SearchTermContainer/>}/>
            <Route path = '/actor/:actorName' element = {<ActorDetails/>}/>
            <Route path = '/search/:searchTerm' element = {<SearchTermContainer/>}/>
            <Route path = '/movie/:movieID' element = {<MovieContainer/>}/>
            <Route path = '/genre/:genre' element = {<GenreContainer/>}/>
            <Route path = '/favoriteMovies' element = {<FavoriteMovies/>}/>
            <Route path = '/favoriteActors' element = {<FavoriteActors/>}/>
            </div>
        </div>
        </>
     </ThemeProvider>
*/
