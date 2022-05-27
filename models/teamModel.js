const Sequelize = require('sequelize')
const db = require('../db.js')

const Team = db.define('team',{
  team_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING,
    allowNull : false
  },
  member:{
    type : Sequelize.INTEGER,
    allowNull : false
  },
  email:{
    type: Sequelize.STRING,
    allowNull : false
  }
});

module.exports = Team;