const res = require('express/lib/response');
const db = require('../models/index')
let Team  = db.Team;
let Tournament = db.Tournament;
let Organizer = db.Organizer;
let Match  = db.Match;

exports.signUp = async function(req,res){
    if (req.body.name && req.body.password){
        let newOrganizer = Organizer.build({name : req.body.name, password : req.body.password})
        await newOrganizer.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
};

exports.signIn =  async function(req,res){
    if (req.body.name && req.body.password){
        await Organizer.findOne({where : {name : req.body.name}})
        .then((data) => {
            if (data.password == req.body.password){
                res.json(data);
            }
            else {
                res.status(400).json({ message: 'password is false' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: 'Organizer not found' })
};

exports.organizerByID = async function(req,res){
    if (req.params.organizer_id){
        await Organizer.findOne(
            {attributes : ['organizer_id' , 'name'], where : {organizer_id : req.params.organizer_id}})
            .then((data) => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else res.status(400).json({ message: 'Organizer not found' })
}
