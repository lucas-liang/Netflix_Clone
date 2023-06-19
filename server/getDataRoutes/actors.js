/*
Express route that contains all logic for actor-related clicks.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import express from 'express';
import * as dotenv from 'dotenv';
import {checkCache} from '../routeCache.js';
import fetch from 'node-fetch';

const router = express.Router();
dotenv.config();
const API_KEY = process.env.TMDB_API_KEY;

router.get('/getID/:actorID', checkCache(300), async(req,res) => {
    const actorID = req.params.actorID;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/person/${actorID}?api_key=${API_KEY}&append_to_response=movie_credits`);
        const data = await response.json();
        res.send(data);
    }catch(error){
        res.send(error);
    }
});

/* timer function to test caching
router.use((req,res,next) => {
    const start = Date.now();
    res.on('finish', () =>{
        const end = Date.now();
        const time = (end-start) / 1000;
        console.log(`${req.url} took ${time} seconds to load`);
    });
    next();
});
*/

router.get('/get/:actorName', checkCache(300), async(req,res) =>{
    const actorName = req.params.actorName;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/person?query=${actorName}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`);
        const data = await response.json();
        res.send(data.results);
    }catch(error){
        res.send(error);
    }
})

export default router;