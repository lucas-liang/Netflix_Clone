/*
Express route for genre-related clicks.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import express from 'express';
import * as dotenv from "dotenv";
import {checkCache} from '../routeCache.js';
import fetch from 'node-fetch';
const router = express.Router();
dotenv.config();
const API_KEY = process.env.TMDB_API_KEY;


router.get('/genreIDs', checkCache(300), async (req, res) => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const data = await response.json();
        res.send(data);
        
    }catch(error){
        res.send(error);
    }
})

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

router.get('/:genre', checkCache(300), async (req,res) => {
    try{
    const genre = req.params.genre;
    const movieList = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`);
    const data = await movieList.json();
    res.send(data);

    }catch (error){
        res.send(error);
    }
});

export default router;