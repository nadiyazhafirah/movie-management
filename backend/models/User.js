const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');

const User = db.define('users', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'admin'
    }
}, {
    freezeTableName: true
});

module.exports = User;