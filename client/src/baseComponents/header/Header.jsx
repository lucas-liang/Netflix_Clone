/*
Component that encompasses the various buttons and their functions at the top part of the page.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import Dark from '../../assets/images/darkMode.svg'
import Light from '../../assets/images/lightMode.svg'
import Home from '../../assets/images/home.svg'
import Search from '../../assets/images/search.svg'
import Login from '../../assets/images/login.svg'
import './Header.css';
import { useNavigate } from 'react-router';


const Header = ({setTheme, theme}) => {

    let navigate = useNavigate();

    function handleSearch(event){
        let searchTerm = event.target.value;
        let keyCode = event.keyCode;
        if(keyCode === 13){
            if(searchTerm !== ""){
                // pass the search term as a parameter
           navigate(`/search/${searchTerm}`);
            }
        }
    }

    function handleClick(event){
        let searchTerm = document.getElementById("Search").value;
        navigate(`/search/${searchTerm}`);
    }

    function changeTheme(event){
        if(theme === 'light'){
            setTheme('dark');
        }
        else{
            setTheme('light');
        }
    }

    function navHome(event){
        navigate('/');
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
                <img id = 'ModeIcon' className = {theme === 'dark' ? 'DarkIcon': 'LightIcon'}
                src = {theme === 'light' ? Dark : Light}
                alt = {theme === 'light' ? 'Dark Mode': 'Light Mode'}
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
            <div id = "Login">
            <img id = "LoginIcon" className = "LoginIcon"
            src = {Login}
            alt = 'Login'
            />
            </div>
        </div>
    );
    }

export default Header;

