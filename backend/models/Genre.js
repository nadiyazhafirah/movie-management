const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');

const Genre = db.define('genres', {
    nama_genre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true
});

module.exports = Genre;