const express = require('express')
const userModel = require('../models/userModel')

let userRoutes = express.Router()

userRoutes.post('/signup', async (req, res) => {
    //Create new user
    try {
        const newUser = new userModel({
            ...req.body
        });
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).send({message: "User info can not be empty"})
    }
});
userRoutes.post('/login', async (req, res) => {
    //User login
    try {
        const {username, password} = req.body;
        const user = await userModel.findOne({username});
        if (!user || password !== user.password) {
            return res.status(401).json({status: false, message: "Invalid Username or Password"});
        }

        res.status(200).json({status: true, username: `${username}`, message: "User logged in successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});
module.exports = userRoutes