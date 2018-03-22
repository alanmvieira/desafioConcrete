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

var Fone = sequelize.define('Telefone', {
    numero:   Sequelize.STRING,
    ddd:  Sequelize.STRING,
    id_user:  Sequelize.INTEGER,
    },{
        timestamps: false
});

sequelize.sync().then(function() {
    }, function(err) {
        console.log(err)
    });

module.exports = () =>{
    return Fone
}