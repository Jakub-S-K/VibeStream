
const Sequelize = require('sequelize');
require('dotenv').config({ path: `../.env`});

sequelize = new Sequelize(process.env.DB_NAME, 'root', process.env.DB_ROOT_PASSWORD, {
    dialect: 'mariadb',
    pool: {
      min: 0,
      max: 5,
      idle: 10000,
    },
    define: {
      charset: 'utf8',
      timestamps: false,
      freezeTableName: true
    },
    benchmark: false,
    logging: false
});

module.exports.conn = sequelize;

module.exports.conn_rdy = function () {
    return new Promise(resolve => {
        require('./schema.js').Init_relations();
        sequelize.authenticate()
            .then(() => resolve(true))
            .catch(error => {
                console.log(error);
                resolve(false)
            });
    })
}

