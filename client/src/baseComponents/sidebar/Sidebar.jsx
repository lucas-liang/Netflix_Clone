/*
Component that includes all of the buttons on the side

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import Logo from '../../assets/images/Netflix-Logo.jpg';
import './Sidebar.css';
import Action from '../../assets/genreImages/action.png';
import Adventure from '../../assets/genreImages/adventure.png';
import Animation from '../../assets/genreImages/animation.png';
import Comedy from '../../assets/genreImages/comedy.png';
import Crime from '../../assets/genreImages/crime.png';
import Documentary from '../../assets/genreImages/documentary.png';
import Drama from '../../assets/genreImages/drama.png';
import Family from '../../assets/genreImages/family.png';
import Fantasy from '../../assets/genreImages/fantasy.png';
import History from '../../assets/genreImages/history.png';
import Horror from '../../assets/genreImages/horror.png';
import Music from '../../assets/genreImages/music.png';
import Mystery from '../../assets/genreImages/mystery.png';
import Romance from '../../assets/genreImages/romance.png';
import Science_Fiction from '../../assets/genreImages/science fiction.png';
import Thriller from '../../assets/genreImages/thriller.png';
import War from '../../assets/genreImages/war.png';
import Western from '../../assets/genreImages/western.png';
import Popular from '../../assets/genreImages/popular.png';
import Top_Rated from '../../assets/genreImages/top rated.png';
import Upcoming from '../../assets/genreImages/upcoming.png';

import {useNavigate} from 'react-router-dom';

const Sidebar = () => {
    let navigate = useNavigate();

    function handleClick(event){
        let genre = event.target.id;
        // pass the genre name as a parameter
        navigate(`/genre/${genre}`);
}
    return(
        <div id = 'Sidebar'>
            <div id = 'SidebarScroll'>
            <div className = 'Logo'>
            <img id = "Logo"
                src = {Logo}
                alt = "Netflix"
                />
            </div>
        <hr></hr>
        <div id = "Categories">
            <div id = "CategoryText">
            Categories
            </div>
            <div id = 'Popular' onClick = {handleClick}>
                <img className = 'Category'
                src = {Popular}
                alt = "Popular"
                onClick = {handleClick}
                id = 'Popular'
                />
            &emsp;Popular
            </div>
            <div id = 'Top_Rated' onClick = {handleClick}>
                <img className = 'Category'
                src = {Top_Rated}
                alt = "Top-Rated"
                onClick = {handleClick}
                id = 'Top_Rated'
                />
            &emsp;Top Rated
            </div>
            <div id = 'Upcoming' onClick = {handleClick}>
                <img className = 'Category'
                src = {Upcoming}
                alt = "Upcoming"
                onClick = {handleClick}
                id = 'Upcoming'
                />
            &emsp;Upcoming
            </div>
        </div>
        <hr></hr>
        <div id = "genres">
        <div id = "GenreText">
        Genres
        </div>
        <div id = 'Action' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Action}
        alt = 'Action'
        onClick = {handleClick}
        id = 'Action'
        />
        &emsp;Action
        </div>
        <div id = 'Adventure' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Adventure}
        alt = 'Adventure'
        onClick = {handleClick}
        id = 'Adventure'
        />
        &emsp;Adventure
        </div>
        <div id = 'Animation' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Animation}
        alt = 'Animation'
        onClick = {handleClick}
        id = 'Animation'
        />
        &emsp;Animation
        </div>
        <div id = 'Comedy' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Comedy}
        alt = 'Comedy'
        onClick = {handleClick}
        id = 'Comedy'
        />
        &emsp;Comedy
        </div>
        <div id = 'Crime' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Crime}
        alt = 'Crime'
        onClick = {handleClick}
        id = 'Crime'
        />
        &emsp;Crime
        </div>
        <div id = 'Documentary' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Documentary}
        alt = 'Documentary'
        onClick = {handleClick}
        id = 'Documentary'
        />
        &emsp;Documentary
        </div>
        <div id = 'Drama' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Drama}
        alt = 'Drama'
        onClick = {handleClick}
        id = 'Drama'
        />
        &emsp;Drama
        </div>
        <div id = 'Family' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Family}
        alt = 'Family'
        onClick = {handleClick}
        id = 'Family'
        />
        &emsp;Family
        </div>
        <div id = 'Fantasy' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Fantasy}
        alt = 'Fantasy'
        onClick = {handleClick}
        id = 'Fantasy'
        />
        &emsp;Fantasy
        </div>
        <div id = 'History' onClick = {handleClick}>
        <img className = 'Genre'
        src = {History}
        alt = 'History'
        onClick = {handleClick}
        id = 'History'
        />
        &emsp;History
        </div>
        <div id = 'Horror' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Horror}
        alt = 'Horror'
        onClick = {handleClick}
        id = 'Horror'
        />
        &emsp;Horror
        </div>
        <div id = 'Music' onClick = {handleClick}>            
        <img className = 'Genre'
        src = {Music}
        alt = 'Music'
        onClick = {handleClick}
        id = 'Music'
        />
        &emsp;Music
        </div>
        <div id = 'Mystery' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Mystery}
        alt = 'Mystery'
        onClick = {handleClick}
        id = 'Mystery'
        />
        &emsp;Mystery
        </div>
        <div id = 'Romance' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Romance}
        alt = 'Romance'
        onClick = {handleClick}
        id = 'Romance'
        />
        &emsp;Romance
        </div>
        <div id = 'Science_Fiction' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Science_Fiction}
        alt = 'Science-Fiction'
        onClick = {handleClick}
        id = 'Science_Fiction'
        />
        &emsp;Science Fiction
        </div>
        <div id = 'Thriller' onClick = {handleClick}>
        <img className = 'Genre'
        src = {Thriller}
        alt = 'Thriller'
        onClick = {handleClick}
        id = 'Thriller'
        />
        &emsp;Thriller
        </div>
        <div id = 'War' onClick = {handleClick}>  
        <img className = 'Genre'
        src = {War}
        alt = 'War'
        onClick = {handleClick}
        id = 'War'
        />
        &emsp;War
        </div>
        <div id = 'Western' onClick = {handleClick}>  
        <img className = 'Genre'
        src = {Western}
        alt = 'Western'
        onClick = {handleClick}
        id = 'Western'
        />
        &emsp;Western
        </div> 
                                                                           
    </div>
        </div>
            </div>

            );
        }
   
export default Sidebar;