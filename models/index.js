const Sequelize = require('sequelize');
const sequelize = require('../db.js');

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Team  = require('./teamModel');
db.Tournament = require('./tournamentModel');
db.Organizer = require('./organizerModel');
db.Match  = require('./matchModel');

db.Match.belongsTo(db.Tournament, {foreignKey:"tournament_id"});
db.Tournament.hasMany(db.Match);

db.Organizer.hasMany(db.Tournament);
db.Tournament.belongsTo(db.Organizer);
db.link_Tournament_Team = sequelize.define('link_Tournament_Team', {score : Sequelize.INTEGER}, { timestamps: false })
db.Tournament.belongsToMany(db.Team, {foreignKey : "tournament_id", through : 'link_Tournament_Team'});
db.Team.hasMany(db.Tournament);

module.exports = db
