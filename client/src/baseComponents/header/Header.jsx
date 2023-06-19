/*
Component that encompasses the various buttons and their functions at the top part of the page.

1.1 - Edited to implement a dropdown button to allow for more functionality

@author Lucas Liang
@version 1.1
@since 16 June 2023
*/

import Dark from '../../assets/images/darkMode.svg'
import Light from '../../assets/images/lightMode.svg'
import Home from '../../assets/images/home.svg'
import Search from '../../assets/images/search.svg'
import Settings from '../../assets/images/settings.svg'
import './Header.css';
import { useNavigate } from 'react-router';
import {useLogin } from '../../hooks/useLogin'
import { useContext } from 'react'
import { ThemeContext } from '../../theme/ThemeContext'


const Header = () => {
    const {isDarkMode, toggleDarkMode} = useContext(ThemeContext);
    const {username, setUsername} = useLogin();
    let navigate = useNavigate();

    function handleSearch(event){
        let searchTerm = event.target.value;
        let keyCode = event.keyCode;
        if(keyCode === 13){
            if(searchTerm !== ""){
                // pass the search term as a parameter
           navigate(`/info/search/${searchTerm}`);
            }
        }
    }

    function handleClick(event){
        event.preventDefault();
        let searchTerm = document.getElementById("Search").value;
        navigate(`/info/search/${searchTerm}`);
    }

    function changeTheme(event){
        toggleDarkMode();
    }
    

    function navHome(event){
        navigate('/');
    }

    function showFavoriteMovies(event){
        if(username === 'guest'){
            alert('You must be logged in to favorite movies');
        }
        else{
            navigate(`/info/favoriteMovies`);
        }
    }

    function showFavoriteActors(event){
        if(username === 'guest'){
            alert('You must be logged in to favorite movies');
        }
        else{
            navigate(`/info/favoriteActors`);
        }
    }

    function navUser(event){
        navigate('/user/login');
    }

    function logout(event){
        if(username !== 'guest'){
            setUsername('guest');
            alert('You have been successfully logged out');
        }
    }

    return(
        <div id = "Header" className = "Header">
            <div id = "Home">
            <img id = "HomeIcon" className = 'HomeIcon'
            src = {Home}
            alt = "Home Button"
            onClick = {navHome}
            />
            </div>
            <div id = 'Mode'>
                <img id = 'ModeIcon' className = 'modeIcon'
                src = {isDarkMode ? Light : Dark}
                alt = {isDarkMode ? 'Light Mode': 'Dark Mode'}
                onClick = {changeTheme}
                />
            </div>
            <div id = 'Input'>
                <div onClick = {handleClick}>
            <img id = "SearchIcon" className = "SearchIcon"
            src = {Search}
            alt = 'Search'
            />
                </div>
            <input id = 'Search' className = "Search"
            placeholder = "Search for movies"
            onKeyDown = {handleSearch}
            >
            </input>
            </div>
            <div className="dropdown">
                <img className = 'dropbtn' id = 'SettingsIcon'
                src = {Settings}
                alt = 'Settings'
                />
                    <div className="dropdown-content">
                        <a onClick = {navUser}>Login</a>
                        <a onClick = {showFavoriteActors}>Show Favorite Actors</a>
                        <a onClick = {showFavoriteMovies}>Show Favorite Movies</a>
                        <a onClick = {logout}>Logout</a>
                    </div>
                </div>
            </div>
    );
    }

export default Header;

