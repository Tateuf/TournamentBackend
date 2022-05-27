const Sequelize = require('sequelize')
const db = require('../db.js')

const Tournament = db.define('tournament',{
    tournament_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type : Sequelize.STRING,
        allowNull : true
    }
});

module.exports = Tournament;