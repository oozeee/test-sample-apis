const Product = require ('../models/product.model');
const Joi = require('joi');
const users = require('../data/users.json');
const accounts = require('../data/accounts.json');
const requests = require('../data/requests.json');
const tokens = require('../data/tokens.json');

/// Auth token validation function ///
function tokenValidation(request){
    const token = tokens.find((element) => {
        return element.token === request.headers.authorization;
    });

    return token;
}

/// health check ///
exports.healthcheck = (req, res) => {
    const response = {
        message: 'TEST environment is in good health....'
    }
    res.send(response);
};

/// login ///
exports.login = (req, res) => {
    const schema = {
        username: Joi.string().min(3).required(),
        password: Joi.string().min(3).required()
    };
    
    const validationResult = Joi.validate(req.body, schema)
    if (validationResult.error){
        res.status(400).send(validationResult.error.details);
    }

    const user = users.find((element) => {
        return element.username === req.body.username && element.password === req.body.password
    });
    if (!user){
        res.status(401).send('Invalid user name or password');
    }

    const response = {
        id: 'TEST-ENV-45745c60-7b1a-11e8-9c9c-2d42b21b1a3e',
        username: req.body.username,
        authtoken: 'CuHggexspyuZk8cIL+cQXudnCGE/9BWGhtRpemd8aP9iM2+1G5OSGRU3P6MqQ/q2LXEwSHG1Otbr433ZKi57awGzonHWVWLtsHQ',
        date: Date.now()
    }

    res.send(response);
}

/// create account ///
exports.createaccount = (req, res) => {
    
    /// Auth token validation ///
    const userToken = tokenValidation(req);
    if (!userToken){
        res.status(401).send('Invalid authorization token');
    }

    const schema = {
        accountname: Joi.string().min(3).required(),
        accountType: Joi.string().min(3).required() && Joi.string().max(3),
        enable: Joi.boolean().required(),
        accountowner: Joi.string().min(3).required(),
        additionalinforamtion: Joi.string().min(3).required()
    };

    const validationResult = Joi.validate(req.body, schema);
    if (validationResult.error){
        res.status(400).send(validationResult.error.details);
    }

    const response = {
        id: 'TEST-ACC-REQ-0000765',
        accountname: req.body.accountname,
        status: 'Submitted'
    }

    res.send(response);
}

/// view accounts ///
exports.viewaccounts = (req, res) => {
    
    /// Auth token validation ///
    const userToken = tokenValidation(req);
    if (!userToken){
        res.status(401).send('Invalid authorization token');
    }

    res.send(accounts);
}

/// view requests ///
exports.viewrequests = (req, res) => {
    
    /// Auth token validation ///
    const userToken = tokenValidation(req);
    if (!userToken){
        res.status(401).send('Invalid authorization token');
    }

    res.send(requests);
}