var jwt = require('jsonwebtoken');
var constantes = require('../../constants/mensagem');

function TokenService() {    
}

TokenService.prototype.valida = function(token, callback) {
    validarToken(token, callback);
}

validarToken = (token, callback) => {

    jwt.verify(token, constantes.PRIVATE_KEY_JWT, function(err, decoded) {      

        if(err){
            callback(err);
        }else {
            callback(null);
        }
    });
}

module.exports = function(){
    return TokenService;
};