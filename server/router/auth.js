const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('../db/conn');
const User = require("../model/userSchema");

router.post('/register', async (req,res) => {
    const {name, email, pass} = req.body;

    try{
        const userExist = await User.findOne({email:email})
        
        if (userExist) {
            return res.status(420).json({error:"User already exists"});}
        else{
        const user = new User({name, email, pass});
        await user.save();

        res.status(201).json({message:"user registered successfuly"});}       

    }catch(err){
        console.log(err);
    }
    
});

router.post('/login', async (req, res) => {
    try{
        let token;
        const {email, pass} = req.body;


        const userLogin = await User.findOne({email:email});
        // console.log(userLogin);

        if(userLogin){
        const isMatch = await bcrypt.compare(pass, userLogin.pass);
        token = await userLogin.generateAuthToken();
        // console.log(token);
        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 30000000),
            httpOnly:true
        });

        // console.log(req.Cookies.jwtoken);
        if(!isMatch){
            res.status(400).json({error:"user login unsuccesful"});
        }else{
            res.json({message:"user login succesful"});
        }}else{
            res.status(400).json({error:"user login unsuccesful"});
            // console.log("4001");
        }
        

    }catch (err) {
        console.log(err);
    }
});

router.get("/logout", (req, res) => {
    // console.log("Hello logout");
    res.clearCookie('jwtoken', { path: '/'});
    res.status(200).send('User Logged Out');
});

module.exports = router;