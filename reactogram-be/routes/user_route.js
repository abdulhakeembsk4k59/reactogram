const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");

const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");


// User Signup Route
router.post("/signup", (req, res) => {
    const {fullName, email, password, profileImg} = req.body;
    if(!fullName || !password || !email){
        return res.status(400).json({error: "One or more mandatory fields are empty"});
    }
    UserModel.findOne({email: email})
    .then((userInDB)=>{
        if(userInDB){
            return res.status(500).json({error: "User with this email already registered"});
        }
        bcryptjs.hash(password, 16)
        .then((hashedPassword) => {
            const user = new UserModel({ fullName, email, password: hashedPassword, profileImg });
            user.save()
            .then((newUser) => {
                res.status(200).json({result: "User Signed up Successfully!"});
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
});



// User Login Route
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if(!password || !email){
        return res.status(400).json({error: "One or more mandatory fields are empty"});
    }
    UserModel.findOne({email: email})
    .then((userInDB)=>{
        if(!userInDB){
            return res.status(401).json({error: "Invalid Credentials!"});
        }
        bcryptjs.compare(password, userInDB.password)
        .then((didMatch) => {
            if(didMatch){
                res.status(200).json({result: "User Loged In Successfully!"});
            }else{
                return res.status(401).json({error: "Invalid Credentials!"});
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
});

module.exports = router;