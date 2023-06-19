/*
Mongoose Schema and Model to be used in the database calls.

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/

import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({

    username:{
        type: String,
        required: true,
    },

    password:{
        type: String,
        required: true,
    },

    favorite_movies: {
        type: Array,
        required: false,
    },

    favorite_actors:{
        type: Array,
        required: false,
    }

});

const User = mongoose.model('User', UserSchema);

export default User;