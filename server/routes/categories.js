/*
Express route for all category clicks.

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


router.get('/popular', checkCache(300), async (req, res) =>{
    try{
    const movieList = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`);
    const data = await movieList.json();
    res.send(data);

    } catch(error){
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

router.get('/topRated', checkCache(300), async(req,res) => {
    try{
    const movieList = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200&api_key=${API_KEY}`);
    const data = await movieList.json();
    res.send(data);
    } 
    catch (error){
        res.send(error);
    }
});

router.get('/upcoming/:pageNumber', async(req,res) => {
    const pageNumber = req.params.pageNumber;
    try{
        // generate ISO-formatted dates for the API filter
        // update: filter does not work, implement manually later.
        const today = new Date();
        let day = today.getDate();
        let month = today.getMonth();
        let year = today.getFullYear();
        let addMonth = new Date(today.setMonth(today.getMonth()+1));
        let nextMonth = addMonth.getMonth();
        let currentDate = new Date(Date.UTC(year, month, day));
        currentDate = currentDate.toISOString().split('T')[0]
        let nextDate = new Date(Date.UTC(year, nextMonth, day));
        nextDate = nextDate.toISOString().split('T')[0]

        const movieList = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${currentDate}&release_date.lte=${nextDate}&api_key=${API_KEY}`);
        const data = await movieList.json();
        res.send(data);
    }
    catch(error){
        res.send(error);
    }

});

export default router;