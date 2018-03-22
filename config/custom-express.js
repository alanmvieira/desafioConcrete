var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

module.exports = function(){
    
    var app = express();

    app.set('view engine','ejs');

    app.use(bodyParser.urlencoded({extend: true}));
    app.use(bodyParser.json());

    app.use(expressValidator());

    app.set('models', require('../models'));

    consign()
        .include('routes')
        .then('persistencia')
        .then('services')
        .then('constants')
        .then('models')
        .into(app);

    app.use(function(req, res, next){
        res.status(404).json({"mensagem" : "O caminho especificado não é válido"});
        return;
    });

    return app;
}