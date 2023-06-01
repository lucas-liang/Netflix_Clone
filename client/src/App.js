/*
A netflix-esque clone using React (with react-router), Express (with express routes), 
and node (with node-fetch and node-cache).
Uses the TMDB API to get the relevant information. 

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/



import {useEffect, useState, createContext} from 'react';
import './App.css';
import Header from '../src/baseComponents/header/Header';
import Sidebar from '../src/baseComponents/sidebar/Sidebar';
import SearchTermContainer from '../src/routeComponents/SearchTermContainer';
import MovieContainer from '../src/routeComponents/MovieContainer';
import GenreContainer from '../src/routeComponents/GenreContainer';
import ActorDetails from '../src/routeComponents/ActorDetails';
import {searchMovies} from './script.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

// defaults to dark mode
const ThemeContext = createContext('dark');

const App = () =>{
    // Initialize a state for the list of movies, search term, and theme
    const [movieList, setMovieList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('iron');
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        getMovies();
    },  []);

    useEffect(() => {getMovies()} , [searchTerm]);

    useEffect(() => {changeTheme()}, [theme]);

    // add or delete the relevant classes for light and dark mode
    function changeTheme(){
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
            const mode = document.querySelector('#ModeIcon');
            mode.classList.add('invert');
            const home = document.querySelector('#HomeIcon');
            home.classList.add('invert');
            const allElements = document.querySelectorAll('*');
            allElements.forEach((element) => {
                element.classList.add('light');
            const search= document.querySelector('#SearchIcon');
            search.classList.add('invert');
            })
            setTheme('light');
        }
        else{
            const allElements = document.querySelectorAll('*');
            allElements.forEach((element) => {
                element.classList.remove('light');
                setTheme('dark');
                const genres = document.querySelectorAll('.Genre');
                genres.forEach((genre) =>{
                genre.classList.remove('invert');
                })
                const categories = document.querySelectorAll('.Category');
                categories.forEach((category) =>{
                category.classList.remove('invert');
                })
                const login = document.querySelector('#LoginIcon');
                login.classList.remove('invert');
                const mode = document.querySelector('#ModeIcon');
                mode.classList.remove('invert');
                const home = document.querySelector('#HomeIcon');
                home.classList.remove('invert');
                const search= document.querySelector('#SearchIcon');
                search.classList.remove('invert');
        });
        }
    }

    // default to movies related to 'iron' onload
    async function getMovies(){
        let data = await searchMovies(searchTerm);
        setMovieList(data);

    }

    // for partial hydration and simplicity of passing parameters, react-router was used.
    // useContext hook simplifies the implementation of light and dark mode.

    return(
        <>
        <BrowserRouter>
        <ThemeContext.Provider value = {theme}>
        <div id = "App">
        <Sidebar />
        <div id = 'Container'>
        <div id = 'ContainerScroll'>
        <Header setTheme = {setTheme} theme = {theme}/>
        <Routes>
            <Route path = '/' element = {<SearchTermContainer theme = {theme}/>}/>
            <Route path = '/search/:searchTerm' element = {<SearchTermContainer theme = {theme}/>}/>
            <Route path = '/movie/:movieID' element = {<MovieContainer theme = {theme}/>}/>
            <Route path = '/genre/:genre' element = {<GenreContainer theme = {theme}/>}/>
            <Route path = '/actor/:actorName' element = {<ActorDetails theme = {theme} />}/>
        </Routes>
        </div>
        </div>
        </div>
        </ThemeContext.Provider>
        </BrowserRouter>
        </>
    );
}


export default App;



