/*
Express Route that contains all logic for basic CRUD calls using Mongoose
for username and password information. Uses bcrypt to salt and hash. 

@author Lucas Liang
@version 1.0
@since 19 June 2023

*/
import express from 'express';
import * as dotenv from 'dotenv';
import User from '../model/User.js';
import bcrypt from 'bcrypt';

const router = express.Router();
dotenv.config();

// add a new user to the database
router.post('/new', async(req, res)=> {
    try{
        const name = req.body.username;
        const pass = req.body.password;
        // '10' is the number of salt rounds applied after the hash.
        const hash = await bcrypt.hash(pass, 10);
        User.create({username: name, password: hash});
        if(await User.countDocuments({username: name}) === 1){
            res.send({succeeded: 'true'});
            }
        else{
            res.send({succeeded: 'false'});
            }
    } 
    catch(error){
        console.log(error);
        res.send(error);
    }
});

// check to see if a username already exists in the database
router.post('/names', async(req,res) => {
    try{
        const name = req.body.username;
        if(await User.countDocuments({username: name}) === 1){
            res.send({available: 'false'});
        }
        else{
            res.send({available: 'true'});
        }

    }catch(error){
        console.log(error);
        res.send(error);
    }
});

// check to see if a username, password pair exists in the database
router.post('/verify', async(req,res)=>{
    try{
        const name = req.body.username;
        const pass = req.body.password;
        const user = await User.findOne({username:name});
        const data = user.toJSON();
        const userHash = (data.password);
        // compare function from bcrypt takes in plain text password
        // and an encrypted hash as params
        bcrypt.compare(pass, userHash, function(err, result) {
            if (result) {
                res.send({login: 'successful'});
            }
            else{
                res.send({login: 'unsuccessful'});
            }
        });
    }catch(error){
        console.log(error);
        res.send(error);
    }
})

// delete a user from the database
router.post('/delete', async(req,res) =>{
   try{
    const name = req.body.username;
    await User.findOneAndDelete({username: name});
    if(await User.countDocuments({username: name}) === 0){
        res.send({deleted: 'true'});
    }
    else{
        res.send({deleted: 'false'});
    }

}catch(error){
    console.log(error);
    res.send(error);
}
});

// update a username in the database
router.post('/updateUsername', async(req,res) =>{
    try{
     const name = req.body.username;
     const newName = req.body.newUsername;
     const user = await User.findOne({username:name});
     await user.updateOne({username: newName});
     await user.save();
     if(await User.countDocuments({username: newName}) === 1){
         res.send({updated: 'true'});
     }
     else{
         res.send({updated: 'false'});
     }
 
 }catch(error){
     console.log(error);
     res.send(error);
 }
 });

 // update a password in the database
 router.post('/updatePassword', async(req,res) =>{
    try{
        const name = req.body.username;
        const newPass = req.body.newPassword;
        const user = await User.findOne({username:name});
        // '10' is the number of salt rounds applied after the hash.
        const hash = await bcrypt.hash(newPass, 10);
        await user.updateOne({password: hash});
        await user.save();
        if(await User.countDocuments({username: name, password: hash}) === 1){
            res.send({updated: 'true'});
     }
        else{
             res.send({updated: 'false'});
     }
 
 }  catch(error){
        console.log(error);
        res.send(error);
 }
 });

export default router;


