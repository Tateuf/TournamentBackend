let express = require('express');
let cors = require('cors');

let app = express();
app.use(express.json());
app.use(cors());

const Sequelize = require('sequelize');
const db = require('./db.js')

db.sync({force: false})

let router = require('./routes');
app.use("/", router)

 // Launch app to listen to specified port
app.listen(8000, function () {
    console.log('Runnings on port 8000');
})