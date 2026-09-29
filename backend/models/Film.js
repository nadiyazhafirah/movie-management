const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/database.js');
const Genre = require('./Genre.js');

const Film = db.define('films', {
    judul: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sutradara: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tahun_rilis: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    durasi: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Genre,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});

// Relasi Sequelize (1:N)
Genre.hasMany(Film, { foreignKey: 'genre_id' });
Film.belongsTo(Genre, { foreignKey: 'genre_id' });

module.exports = Film;