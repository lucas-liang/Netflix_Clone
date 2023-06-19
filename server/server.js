/*
Express App that uses express routes to better compartmentalize calls to the API.

1.1 - Added database routes

@author Lucas Liang
@version 1.1
@since 19 June 2023
*/

import express from "express";
import cors from "cors";
import genreRoutes from './getDataRoutes/genres.js';
import categoryRoutes from './getDataRoutes/categories.js';
import movieRoutes from './getDataRoutes/movies.js';
import actorRoutes from './getDataRoutes/actors.js';
import userRoutes from './databaseRoutes/userAccount.js';
import mongoose from 'mongoose';
import mongoURL from 'dotenv';
import bodyParser from "body-parser";
import userMovieRoutes from './databaseRoutes/userFavMovies.js';
import userActorRoutes from './databaseRoutes/userFavActors.js';

// const URL = 'http://localhost:5000'
const URL = 'https://netflix-clone-bdvj.onrender.com';
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true })
.then(res => console.log(`Connection Succesful ${res}`))
.catch(err => console.log(`Error in DB connection ${err}`));
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.get('/', (req,res) =>{
    res.send('hello');
});

// use the relevant route to make the correct API call
app.use('/genres/get/', genreRoutes);
app.use('/categories', categoryRoutes);
app.use('/movies', movieRoutes);
app.use('/actors', actorRoutes);
app.use('/users', userRoutes);
app.use('/userMovies', userMovieRoutes);
app.use('/userActors', userActorRoutes);


app.listen(5000, () => console.log(`Server is running on ${URL}`));

