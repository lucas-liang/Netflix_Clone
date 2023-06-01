/*
Component that displays the collection of movies related to the genre clicked.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import { getMoviesByGenre, getPopularMovies, getTopRatedMovies, getUpcomingMovies } from '../script';
import GenreBanner from '../baseComponents/GenreBanner';
import GenreCollection from '../collectionComponents/movies/genres/GenreCollection';
import UpcomingBanner from '../baseComponents/UpcomingBanner';
import UpcomingCollection from '../collectionComponents/movies/genres/UpcomingCollection';



const GenreContainer = (theme) => {
    // using navigate from react-router
    let genre = useParams();
    const [movieList, setMovieList] = useState([]);
    // change display based on context
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
    useEffect(() => {getMovies()}, [genre]);


    async function getMovies(){
        // special cases of categories being clicked 
        // as they have different API calls
        let genreName = genre.genre;
        if (genreName === "Popular"){
            let data = await getPopularMovies();        
            setMovieList(data);
        }
        else if (genreName === "Top_Rated"){
            let data = await getTopRatedMovies();
            setMovieList(data);
        }
        else if (genreName === "Upcoming"){
            let data = await getUpcomingMovies(1);
            let movies = [];
            const today = new Date();
            let day = today.getDate();
            let month = today.getMonth();
            let year = today.getFullYear();
            let currentDate = new Date(Date.UTC(year, month, day));
            currentDate = currentDate.toISOString().split('T')[0];
            // keep making calls until 20 movies that are actually upcoming are found
            // the API's filter does not work
                for(let i = 1; i < data.total_pages; i++){
                    if(movies.length === 20){
                        break;
                    }
                    let currData = await getUpcomingMovies(i);
                    for(let j = 0; j < 20; j++){
                    if (compareDates(currData.results[j].release_date, currentDate)){
                        movies.push(currData.results[j]);
                        if(movies.length === 20){
                            break;
                            }
                        }
                    }
                }
            sortByPopularity(movies);
            setMovieList(movies);
        }
        else{
        let data = await getMoviesByGenre(genreName);
        setMovieList(data);
        }
    }

    // compare function for dates to see if a movie has been released or not
    function compareDates(d1, d2) {
        let date1 = new Date(d1).getTime();
        let date2 = new Date(d2).getTime();
      
        if (date1 < date2) {
          return false;
        } else if (date1 > date2) {
          return true;
        } else {
          return true;
        }
      };

      // compare function for sorting by popularity 
      // not supported by API for genres
      function sortByPopularity(movieList){
        movieList.sort((a, b) => a.popularity < b.popularity ?
        1 : a.popularity > b.popularity ? -1 : 0);
      }

    function doesExist(){
        if(Object.keys(movieList).length !== 0){
            let genreName = genre.genre;
            if (genreName === ''){
                return <></>;
            }
            else if(movieList.results === undefined){
                return(
                <div className = "genres">
                <UpcomingBanner movieList = {movieList}/>
                <UpcomingCollection movieList = {movieList} />
                </div>
                );
            }
            else{
            return(
                <div className = "genres">
                <GenreBanner movieList = {movieList}/>
                <GenreCollection movieList = {movieList} />
                </div>
            )
            }
        }
    }
    return(
        doesExist()
    );

}

export default GenreContainer;