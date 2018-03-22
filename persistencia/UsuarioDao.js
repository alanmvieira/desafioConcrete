var sprintf = require('sprintf');

function UsuarioDao(app) {
    this._app = app;
}

UsuarioDao.prototype.salvaORM = function(usuario, callback) {
    
    var usuarioDAO = this._app.get('models').Usuario;
    var foneDAO = this._app.get('models').Telefone;

    var newUser = usuarioDAO.build({
        nome: usuario.nome, 
        senha: usuario.senha,
        email: usuario.email,
        data_atualizacao: new Date(),
        data_criacao: new Date(),
        ultimo_login: new Date(),
        token : usuario.token
    });

    newUser.save().then(function () {     
        
        usuarioDAO.find({ where: {email: usuario.email} }).then(retornoUser => {

            let telefone = usuario.telefones;

            if(telefone != undefined){
                telefone.forEach( (fone) => {
            
                    var newFone = foneDAO.build({
                        numero: fone.numero, 
                        ddd: fone.ddd,
                        id_user: retornoUser.id
                    });
        
                    newFone.save().then(function () {
                        callback(null, retornoUser)    
                    });
        
                })
            }
        })

    });

}

UsuarioDao.prototype.buscaPorEmailORM = function (emailInformado, callback) {
    
    var usuarioDAO = this._app.get('models').Usuario;

    usuarioDAO.find({ where: {email: emailInformado} }).then(retornoUser => {
        callback(retornoUser);
    });

}

UsuarioDao.prototype.buscaPorTokenORM = function (tokenInformado, callback) {
    
    var usuarioDAO = this._app.get('models').Usuario;

    usuarioDAO.find({ where: {token: tokenInformado} }).then(retornoToken => {
        callback(retornoToken);
    });

}

UsuarioDao.prototype.buscaPorIdORM = function (idInformado, callback) {
    
    var usuarioDAO = this._app.get('models').Usuario;

    usuarioDAO.find({ where: {id: idInformado} }).then(retornoUser => {
        callback(retornoUser);
    });

}

module.exports = function(){
    return UsuarioDao;
};