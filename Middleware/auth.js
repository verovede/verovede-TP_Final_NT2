const jwt = require('jsonwebtoken');
require('dotenv').config();
const usuarios = require('../data/Usuarios');

function auth(req, res, next){
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        jwt.verify(token, process.env.SECRET);
        next();
    } catch (error) {
        res.status(401).send({error: error.message});
    }
}

module.exports = {auth};