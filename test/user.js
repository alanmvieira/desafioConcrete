var express = require('../config/custom-express')();
var request = require('supertest')(express);

describe('#User',function(){
    
    it('#get user sem token',function(done){
        
        request.get('/user/999999')
            .expect(401,done);

    });

    it('#get user token invalido',function(done){
        
        request.get('/user/35')
            .set('token','invalid')
            .expect(401,done);

    });
    
    it('#signIn user campos vazio',function(done){

        let usuarioCamposVazio = {
            "email": "",
            "senha": ""
        }

        request.post('/user/signin')
            .send(usuarioCamposVazio)
            .expect(400,done);

    });

    it('#signIn user campos invalidos', function(done){

        let usuarioCamposInvalido = {
            "email": "emailInvalido",
            "senha": "senhaInvalida"
        }

        request.post('/user/signin')
            .send(usuarioCamposInvalido)
            .expect(401, done);

    });

    it('#signUp user campos vazio',function(done){

        let usuarioCamposVazio = {
            "nome": "",
            "email": "",
            "senha": ""
        }

        request.post('/user/')
            .send(usuarioCamposVazio)
            .expect(400,done);

    });


});