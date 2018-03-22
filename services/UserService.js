var logger = require('../services/logger');
var constantes = require('../constants/mensagem');
var jwt = require('jsonwebtoken');

function UsuarioService(app) {
    this._app = app;
}

UsuarioService.prototype.buscarPorToken = function(token, callback) {
    
    var usuarioDao = new this._app.persistencia.UsuarioDao( this._app);

    usuarioDao.buscaPorTokenORM(token, (resultado) => {

        if(resultado === null) {
            callback(null);
        }else {
            logger.info("Erro com mensagem de não autorizado");
            callback(resultado,"Erro com mensagem de não autorizado");
        }

    });

};

UsuarioService.prototype.buscaPorId = function(user_id, token, callback) {
    
    var usuarioDao = new this._app.persistencia.UsuarioDao(this._app);

    usuarioDao.buscaPorIdORM(user_id, (resultado) => {
        
        if (resultado) {
            
            let usuario = resultado;
            var tokenGravado = usuario.token;

            if (tokenGravado === token) {
            
                logger.info("Busca realizada com sucesso");
                callback(null, usuario);
            
            } else {
                
                retorno = {};
                retorno.status = 401
                retorno.mensagem = constantes.MENSAGEM_NAO_AUTORIZADO

                logger.info("Erro com mensagem de não autorizado");
                callback({}, retorno);
                
            }

        } else {

            retorno = {};
            retorno.status = 401
            retorno.mensagem = constantes.MENSAGEM_USUARIO_NAO_ENCONTRADO

            logger.info("Erro com mensagem de usuário não encontrado");
            callback(null, retorno);
            
        }
    });

};

UsuarioService.prototype.buscaPorEmail = function(usuario_email, callback) {
    
    var usuarioDao = new this._app.persistencia.UsuarioDao( this._app);

    usuarioDao.buscaPorEmailORM(usuario_email, (resultado) => {
        
        if(resultado === null){
            retorno = {};
            retorno.status = 401;
            callback(retorno);
        }else {
            logger.info("Erro na adição do usuário: email já cadastrado");
                
            retorno = {};
            retorno.status = 409;
            retorno.mensagem = constantes.MENSAGEM_EMAIL_JA_CADASTRADO;
            retorno.resposta = resultado;
            
            callback(null, retorno);   
        }
    });

};

UsuarioService.prototype.salvaUser = function(usuario, callback) {
    
    var usuarioDao = new this._app.persistencia.UsuarioDao(this._app);

    let token = jwt.sign(usuario, constantes.PRIVATE_KEY_JWT, {
        expiresIn: 600*30 
    });

    usuario.token = token;
    
    usuarioDao.salvaORM(usuario, (erro, resultado) => {
        if(erro === null){
            
            logger.info("Usuário adicionado com sucesso");
            callback(null, usuario);

        }else {
            logger.info("Erro na adição do usuário");

            retorno = {};
            retorno.status = 500;
            retorno.mensagem = erro;

            callback(erro, retorno);

        }
    });
    

};

module.exports = function(){
    return UsuarioService;
};
