/*
Express App that uses express routes to better compartmentalize calls to the API.

@author Lucas Liang
@version 1.0
@since 31 May 2023
*/

import express from "express";
import cors from "cors";
import genreRoutes from './routes/genres.js';
import categoryRoutes from './routes/categories.js';
import movieRoutes from './routes/movies.js';
import actorRoutes from './routes/actors.js';

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req,res) =>{
    res.send('hello');
});

// use the relevant route to make the correct API call
app.use('/genres/get/', genreRoutes);
app.use('/categories', categoryRoutes);
app.use('/movies' ,movieRoutes);
app.use('/actors', actorRoutes);



app.listen(5000, () => console.log('Server is running on port http://localhost:5000'));

