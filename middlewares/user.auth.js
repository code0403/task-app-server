const express = require("express")
const jwt = require("jsonwebtoken");


const auth = (req, res, next) => {

    const token = req.headers.authorization;

    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(decoded){
                req.body.userID = decoded.userID
                next()
            } else {
                res.status(400).send({"msg" : "Invalid, Please Check The Creadentials!"})
            }
        })
    } else {
        res.status(400).send({"msg" : "Please Login First!"})    
    }
}

module.exports = { auth };