const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./db_conn.js').conn;

const user_schema = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.BIGINT(11),
        autoIncrement: true,
        primaryKey: true,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING(512)
      },
      creation_date: {
        type: DataTypes.DATE(6)
      },
      bio: {
        type: DataTypes.STRING(4095),
        allowNull: false
      }
    },
    {
        freezeTableName: true,
    }
  );
  
  module.exports.User = user_schema;