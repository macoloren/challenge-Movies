const express = require('express');
const authService = require('../services/authService');
const Success = require('../handlers/successHandler');
const logger = require('../loaders/logger');
const { request, response } = require('express');


//TODO: Metodo para hacer login
const login = async(req = request, res = response, next) => {
    const {email, password} = req.body;
    try{
        res.json(new Success(await authService.login(email, password)));
    }catch(error) {
        next(error);
    };
};

//TODO: Metodo para Register
const register = async(req = request, res = response, next) => {
    const {name, email, password} = req.body;
    try{
        res.status(201).json(new Success(await authService.register(name, email, password)));
    }catch(error) {
        next(error);
    };
};


module.exports = {
    login,
    register
}