/*
Script file that contains functions that allow for the front-end to call the relevant back-end route

@author Lucas Liang
@version 1.0
@since 31 May 2023

*/

// get movies based on the genre name that was clicked
// http://localhost:5000
// const URL =
const URL = 'http://localhost:5000';
export async function getMoviesByGenre(genreName){
    if(genreName === ''){
        return;
    }
    const genres = await fetch ('http://localhost:5000/genres/get/genreIDs');
    const IDs = await genres.json();
    if(genreName === "Science_Fiction"){
        genreName = "Science Fiction";
    }
    let genreID = 0;
    for(let i = 0; i < IDs.genres.length; i++){
        if(IDs.genres[i].name === genreName){
            genreID = IDs.genres[i].id;
        }
    }
    const movies = await fetch (`http://localhost:5000/genres/get/${genreID}`);
    const data = await movies.json();
    return(data);
}


// get all of the information relating to a specific movie from its ID
export async function getMovieByID(movieID){
    if (movieID === ''){
        return [];
    }
    const response = await fetch(`http://localhost:5000/movies/movieInfo/${movieID}`);
    const data = await response.json();
    return data;
}

// get all popular movies for the popular category
export async function getPopularMovies(){
    const response = await fetch(`http://localhost:5000/categories/popular`);
    const data = response.json();
    return data;

}

// get upcoming movies for the upcoming category
export async function getUpcomingMovies(pageNumber){
    const response = await fetch(`http://localhost:5000/categories/upcoming/${pageNumber}`);
    const data = response.json();
    return data;

}

// get the highest rated movies for Top Rated category
export async function getTopRatedMovies(){
    const response = await fetch(`http://localhost:5000/categories/topRated`);
    const data = response.json();
    return data;

}

// find the movies closest related to the keyword search
export async function searchMovies(searchTerm){
    if(searchTerm === ''){
        return [];
    }
    const response = await fetch(`http://localhost:5000/movies/keyword/${searchTerm}`)
    const data = await response.json();
    return data;
    
}

// get actorInfo from the actor's name
export async function getActorDetails(actorName){
    if(actorName === ''){
        return [];
    }
    const response = await fetch(`http://localhost:5000/actors/get/${actorName}`);
    const data = await response.json();
    const actorID = data[0].id;
    if(actorID === undefined){
        return [];
    }
    const actorInfo = await fetch(`http://localhost:5000/actors/getID/${actorID}`);
    const actorDetails= await actorInfo.json();
    return actorDetails;
}


