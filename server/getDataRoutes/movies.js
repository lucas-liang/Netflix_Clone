/*
Express route for all things related to movies.

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



router.get('/keyword/:searchTerm', checkCache(300), async (req, res) => {
    const searchTerm = req.params.searchTerm;
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}&page=1`);
        const data =  await response.json();
        res.send(data.results);

    }
    catch (error){
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

router.get('/movieInfo/:movieID', checkCache(300), async(req,res) =>{
    const movieID = req.params.movieID;
    try{
        const response = await fetch (`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&append_to_response=credits,videos,recommendations`);
        const data = await response.json();
        res.send(data);
    }
    catch(error){
        res.send(error);
    }
});

export default router;