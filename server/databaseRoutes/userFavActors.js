/*
Express Route that contains all logic for basic 
CRUD calls using Mongoose for adding and deleting 
favorite actors associated with a user from the database.

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/


import express from 'express';
import * as dotenv from 'dotenv';
import User from '../model/User.js';
const router = express.Router();
dotenv.config();


// add an Actor to the user's favorite_actors array
router.post('/addActor', async(req,res) => {
    const name = req.body.username;
    const actorID = req.body.actorID;
    const user = await User.findOne({username: name});
    let prevNum = 0;
    if(user.favorite_actors.length !== null){
       prevNum = user.favorite_actors.length;
    }
    user.favorite_actors.push(actorID);
    await user.save();
    const currNum = user.favorite_actors.length;
    if(currNum > prevNum){
        res.send({added: 'true'});
    }
    else{
        res.send({added: 'false'});
    }

});

// remove an Actor from the user's favorite_actors array
router.post('/removeActor', async(req,res) => {
    const name = req.body.username;
    const actorID = req.body.actorID;
    const user = await User.findOne({username: name});
    const prevNum = user.favorite_actors.length;
    let indexToPop = null;
    for(let i = 0; i < prevNum; i++){
        if(user.favorite_actors[i].toString() === actorID){
            indexToPop = i;
        }
    }
    user.favorite_actors.splice(indexToPop,1);
    await user.save();
    if(indexToPop !== null){
        res.send({removed: 'true'});
    }
    else{
        res.send({removed: 'false'});
    }

});

// see if an Actor is in the user's favorite_actors array
router.post('/check', async(req,res) => {
    const actorID = req.body.actorID;
    const name = req.body.username;
    const user = await User.findOne({username: name});
    let found = false;
    for(let i = 0; i < user.favorite_actors.length; i++){
        if(user.favorite_actors[i].toString() === actorID){
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

// get all of the user's favorite actors from the database
router.post('/getFavorites', async(req,res) =>{
    const name = req.body.username;
    const response = await User.findOne({username:name}, {favorite_actors : 1});
    if(response === null){
        res.send({fetched: 'false'});
    }
    else{
        res.send({fetched: 'true', favorite_actors: response.favorite_actors});
    }
})

export default router;