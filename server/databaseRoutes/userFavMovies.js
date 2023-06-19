/*
Express Route that contains all logic for basic 
CRUD calls using Mongoose for adding and deleting 
favorite movies associated with a user from the database.

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/

import express from 'express';
import * as dotenv from 'dotenv';
import User from '../model/User.js';
const router = express.Router();
dotenv.config();

// add an Actor to the user's favorite_movies array
router.post('/addMovie', async(req,res) => {
    const name = req.body.username;
    const movieID = req.body.movieID;
    const user = await User.findOne({username: name});
    let prevNum = 0;
    if(user.favorite_movies.length !== null){
       prevNum = user.favorite_movies.length;
    }
    user.favorite_movies.push(movieID);
    await user.save();
    const currNum = user.favorite_movies.length;
    if(currNum > prevNum){
        res.send({added: 'true'});
    }
    else{
        res.send({added: 'false'});
    }

});

// remove a movie from the user's favorite_movies array
router.post('/removeMovie', async(req,res) => {
    const name = req.body.username;
    const movieID = req.body.movieID;
    const user = await User.findOne({username: name});
    const prevNum = user.favorite_movies.length;
    let indexToPop = null;
    for(let i = 0; i < prevNum; i++){
        if(user.favorite_movies[i].toString() === movieID){
            indexToPop = i;
        }
    }
    user.favorite_movies.splice(indexToPop,1);
    await user.save();
    if(indexToPop !== null){
        res.send({removed: 'true'});
    }
    else{
        res.send({removed: 'false'});
    }

});

// see if a movie is in the user's favorite_movies array
router.post('/check', async(req,res) => {
    const movieID = req.body.movieID;
    const name = req.body.username;
    const user = await User.findOne({username: name});
    let found = false;
    for(let i = 0; i < user.favorite_movies.length; i++){
        if(user.favorite_movies[i].toString() === movieID){
            found = true;
        }
    }
    if(found === true){
        res.send({found: 'true'});
    }
    else{
        res.send({found: 'false'});
    }

})

// get all of the user's favorite movies from the database
router.post('/getFavorites', async(req,res) =>{
    const name = req.body.username;
    const response = await User.findOne({username:name}, {favorite_movies : 1});
    if(response === null){
        res.send({fetched: 'false'});
    }
    else{
        res.send({fetched: 'true', favorite_movies: response.favorite_movies});
    }
})

export default router;