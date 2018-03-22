var jwt = require('jsonwebtoken');
var constantes = require('../constants/mensagem');
var logger = require('../services/logger');

module.exports = function(app){

    app.post('/user', function(req, res){
        
        logger.info("Nova requisição para adicionar usuario");

        req.assert('email',
            'E-mail é obrigatório').notEmpty();
        req.assert('nome',
            'Nome é obrigatório').notEmpty();
        req.assert('senha',
            'Senha é obrigatório').notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            logger.info("Erro na validação dos dados para adicionar usuario");
            res.status(400).send(erros);
            return;
        }
        
        var usuario = req.body;
        var userService = new app.services.UserService(app);

        userService.buscaPorEmail(usuario.email, (erro, resultado) => {

            if (erro === null) {
                res.status(resultado.status).json({ mensagem: resultado.mensagem});
                return;
            }else {
            
                userService.salvaUser(usuario, (erro, resultado) => {

                    if (erro){
                        res.status(resultado.status).json({ mensagem: resultado.mensagem});
                        return;
                    }else {
                        res.status(201).json({resultado});
                        return;
                    }

                });
                
            }

        });

    });

    app.post('/user/signin', function(req, res){
        
        req.assert('email',
            'E-mail é obrigatório').notEmpty();
        req.assert('senha',
            'Senha é obrigatório').notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            logger.info("Erro na validação dos dados para fazer signin");
            res.status(400).send(erros);
            return;
        }

        var usuario = req.body;

        let userService = new app.services.UserService(app);

        userService.buscaPorEmail(usuario.email, (erro, resultado) => {
            
            if (erro) {
                res.status(401).json({ mensagem: erro});
                return;
            } else {

                if (resultado.resposta.senha === usuario.senha){
                    
                    logger.info("Signin realizado com sucesso");
                    
                    let usuario = resultado.resposta;
                    res.status(200).json({ usuario });
                    return;
                } else {
                    logger.info("Erro com mensagem email e/ou senha inválido");
                    res.status(409).json({ mensagem: constantes.MENSAGEM_EMAIL_SENHA_INVALIDO });
                    return;
                }
                
            }

        });

    });

    app.get('/',function(req, res){
        res.render("index");
    });

    app.get('/user/:id', function(req, res){
    
        let token = req.headers.token;
        let user_id = req.params.id; 
        
        if (token === "" || token == undefined ){
            logger.info("Erro na validação para fazer busca de usuário");
            res.status(401).json({ mensagem: constantes.MENSAGEM_NAO_AUTORIZADO });
            return;
        }
    
        let tokenService = new app.services.validations.TokenService();

        tokenService.valida( token, (erro, resultado) => {
            
            if (erro){
                
                logger.info("Erro com mensagem de sessão inválida");
                res.status(401).json({ mensagem: constantes.MENSAGEM_SESSAO_INVALIDA });
                return;

            } else {
                 
                let userService = new app.services.UserService(app);
        
                userService.buscarPorToken(token, (resultado) => {

                    if( resultado === null ){
                    
                        logger.info("Erro com mensagem de não autorizado");
                        res.status(401).json({ mensagem: constantes.MENSAGEM_NAO_AUTORIZADO });
                        return;
                    
                    } else {

                        userService.buscaPorId(user_id, token, (erros, resultado) => {
                           
                            if(erros){
                                res.status(resultado.status).json({ mensagem: resultado.mensagem });
                                return;
                            }else {
                                res.status(200).json(resultado);
                                return;                                    
                            }

                        });

                    }
                    
                });
            }
        });

    });
    
}
