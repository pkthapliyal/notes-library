const express = require('express');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

require('dotenv').config()
const secretKey = process.env.secretKey;

const userRoute = express.Router();



const { UserModel } = require("../models/User.model")


userRoute.get("/", (req, res) => {
    res.send("Users")
})

userRoute.post("/register", async (req, res) => {

    const { name, email, age, pass } = req.body;
    if (email && name && age && pass) {
        try {
            bcrypt.hash(pass, 5, async (err, hash) => {
                user = UserModel({ name, email, pass: hash, age })
                await user.save()
                res.send({ "messege": "one user has been registered !" })
            })

        } catch (error) {
            res.status(401).send({ "error": error.messege })
        }
    }



})


userRoute.post("/login", async (req, res) => {
    const { email, pass } = req.body

    try {
        user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(401).send({ "err": "Wrong credentials !" })
        }
        bcrypt.compare(pass, user.pass, async (err, result) => {
            if (err) {
                return res.status(401).send({ "err": err.messege })
            }
            const token = jwt.sign({ authorID: user._id, author: user.name }, secretKey);
            return res.send({ "messege": "login successfully ", "token": token })

        })

    } catch (error) {
        return res.status(401).send({ "err": error.messege })
    }
})



module.exports = { userRoute }