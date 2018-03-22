var Sequelize = require('sequelize');
var config = require('../config/config').database;  

var sequelize = new Sequelize(
    config.database,
    config.user,
    config.password,
    {
        dialect: "mysql"
    }
);

var Usuario = sequelize.define('Usuario', {
    nome:   Sequelize.STRING,
    senha:  Sequelize.STRING,
    email:  Sequelize.STRING,
    data_atualizacao:  Sequelize.DATE,
    data_criacao:  Sequelize.DATE,
    ultimo_login:  Sequelize.DATE,
    token:  Sequelize.TEXT
    },{
        timestamps: false
});


sequelize.sync().then(function() {
    }, function(err) {
        console.log(err)
    });

module.exports = () =>{
    return Usuario
}