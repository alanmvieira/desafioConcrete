var Sequelize = require('sequelize');
var config = require('../config/config').database;  

if (!process.env.NODE_ENV) {
    var sequelize = new Sequelize(
        config.database,
        config.user,
        config.password,
        {
            dialect: "mysql"
        }
    );
} else if (process.env.NODE_ENV === 'production') {
    var sequelize = new Sequelize(
        'heroku_58c6b9b00163564',
        'b6ed6cb4867954',
        '3f41007b',
        {
            host: 'us-cdbr-iron-east-05.cleardb.net',
            dialect: "mysql"
        }
    );
}

var models = [
    'Usuario',
    'Telefone'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m) {
    // m.Usuario.hasMany(m.Fone), {as: 'fones'};
    // m.Fone.belongsTo(m.Usuario);
  })(module.exports);

module.exports.sequelize = sequelize;

