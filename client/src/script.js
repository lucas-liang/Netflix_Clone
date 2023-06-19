/*
Script file that contains functions that allow for the front-end to call the relevant back-end route

1.1 - Added functions for MongoDB database calls

@author Lucas Liang
@version 1.1
@since 19 June 2023

*/

// get movies based on the genre name that was clicked
// const URL = 'http://localhost:5000'
const URL = 'https://netflix-clone-bdvj.onrender.com';
// get movies based on the genre name that was clicked
export async function getMoviesByGenre(genreName){
    if(genreName === ''){
        return;
    }
    const genres = await fetch (`${URL}/genres/get/genreIDs`);
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
    const movies = await fetch (`${URL}/genres/get/${genreID}`);
    const data = await movies.json();
    return(data);
}


// get all of the information relating to a specific movie from its ID
export async function getMovieByID(movieID){
    if (movieID === ''){
        return [];
    }
    const response = await fetch(`${URL}/movies/movieInfo/${movieID}`);
    const data = await response.json();
    return data;
}

// get all popular movies for the popular category
export async function getPopularMovies(){
    const response = await fetch(`${URL}/categories/popular`);
    const data = response.json();
    return data;

}

// get upcoming movies for the upcoming category
export async function getUpcomingMovies(pageNumber){
    const response = await fetch(`${URL}/categories/upcoming/${pageNumber}`);
    const data = response.json();
    return data;

}

// get the highest rated movies for Top Rated category
export async function getTopRatedMovies(){
    const response = await fetch(`${URL}/categories/topRated`);
    const data = response.json();
    return data;

}

// find the movies closest related to the keyword search
export async function searchMovies(searchTerm){
    if(searchTerm === ''){
        return [];
    }
    const response = await fetch(`${URL}/movies/keyword/${searchTerm}`)
    const data = await response.json();
    return data;
    
}

// get actorInfo from the actor's name
export async function getActorDetails(actorName){
    if(actorName === ''){
        return [];
    }
    const response = await fetch(`${URL}/actors/get/${actorName}`);
    const data = await response.json();
    const actorID = data[0].id;
    if(actorID === undefined){
        return [];
    }
    const actorInfo = await fetch(`${URL}/actors/getID/${actorID}`);
    const actorDetails= await actorInfo.json();
    return actorDetails;
}

// get actorInfo by ID
export async function getActorByID(actorID){
    const response = await fetch(`${URL}/actors/getID/${actorID}`);
    const data = await response.json();
    return data;
}

// add a user to the database
export async function addUser(username, password){
    const response = await fetch(`${URL}/users/new`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    return data;
}

// see if a username is available or not in the database
export async function checkUsername(username){
    const response = await fetch(`${URL}/users/names`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username})
    });
    const data = await response.json();
    return data;
}

// see if a username password combination is valid
export async function checkCredentials(username, password){
    const response = await fetch(`${URL}/users/verify`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
});
    const data = await response.json();
    return data;
}

// add a movie to the user's favorite_movies list
export async function addFavoriteMovie(username, movieID){
    const response = await fetch(`${URL}/userMovies/addMovie`, {
        method: 'POST',
        headers:
        {'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, movieID})
});
    const data = await response.json();
    return data;
}

// remove a movie from the user's favorite_movies list
export async function removeFavoriteMovie(username, movieID){
    const response = await fetch(`${URL}/userMovies/removeMovie`,{
    method: 'POST',
    headers:{'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, movieID})
    });
    const data = await response.json();
    return data;
}

// see if the user has favorited a movie or not
export async function isFavoriteMovie(username, movieID){
    const response = await fetch (`${URL}/userMovies/check`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, movieID})
})
    const data = await response.json();
    return data;

}

// add an actor to the user's favorite_actors list
export async function addFavoriteActor(username, actorID){
    const response = await fetch(`${URL}/userActors/addActor`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, actorID})
    })
        const data = await response.json();
        return data;
}

// remove an actor from the user's favorite_actors list
export async function removeFavoriteActor(username, actorID){
    const response = await fetch(`${URL}/userActors/removeActor`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, actorID})
    })
        const data = await response.json();
        return data;
}

// check to see if the user has favorited the actor or not
export async function isFavoriteActor(username, actorID){
    const response = await fetch (`${URL}/userActors/check`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, actorID})
})
    const data = await response.json();
    return data;

}

// grab all movieIDs the user has favorited
export async function getFavoriteMovies(username){
    const response = await fetch(`${URL}/userMovies/getFavorites`,{
    method: 'POST',
    headers:{
        'Content-Type' : 'application/json'
        },
    body: JSON.stringify({username})
    })
    const data = await response.json();
    return data;
}

// grab all of the actorIDs the user has favorited
export async function getFavoriteActors(username){
    const response = await fetch(`${URL}/userActors/getFavorites`,{
    method: 'POST',
    headers:{
        'Content-Type' : 'application/json'
        },
    body: JSON.stringify({username})
    })
    const data = await response.json();
    return data;
}

// delete a user from the database
export async function deleteUser(username){
    const response = await fetch(`${URL}/users/delete`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify({username})
        })
        const data = await response.json();
        return data;
}

// allow a username to update their username if available
export async function updateUsername(username, newUsername){
    let updateData = {updated: 'false'};
    const response = await fetch(`${URL}/users/names`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify({username: newUsername})
        })
        const data = await response.json();
        if(data.available === 'false'){
            return updateData;
        }
    const updateResponse = await fetch(`${URL}/users/updateUsername`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify({username, newUsername})
        })
        updateData = await updateResponse.json();
    return updateData;   
}

// allow for a user to update their password
export async function updatePassword(username, newPassword){
    const updateResponse = await fetch(`${URL}/users/updatePassword`,{
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
            },
        body: JSON.stringify({username, newPassword})
        })
        const updateData = await updateResponse.json();
    return updateData; 

}


