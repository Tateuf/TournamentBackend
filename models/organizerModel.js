const Sequelize = require('sequelize')
const db = require('../db.js')


const Organizer = db.define('organizer',{
    organizer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: db.Sequelize.STRING,
        allowNull : false,
        unique : true
    },
    password :{
        type : db.Sequelize.STRING,
        allowNull: false
    }
});


module.exports = Organizer;