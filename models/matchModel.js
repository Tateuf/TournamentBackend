const Sequelize = require('sequelize');
const db = require('../db.js');

const Match = db.define('match',{
    match_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    scoreA:{
        type: Sequelize.INTEGER,
        allowNull : true
    },
    scoreB:{
        type: Sequelize.INTEGER,
        allowNull : true
    },
    teamA:{
        type: Sequelize.INTEGER,
        allowNull : true
    },
    teamB:{
        type: Sequelize.INTEGER,
        allowNull : true
    },
    winner:{
        type: Sequelize.INTEGER,
        allowNull : true
    }
});

module.exports = Match;
//exports.Match = Match;