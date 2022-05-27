const { json } = require('express/lib/response');
const db = require('../models/index')
let Team  = db.Team;
let Tournament = db.Tournament;
let Organizer = db.Organizer;
let Match  = db.Match;

exports.editMatch = async function(req,res){
    if (req.body.match_id){
        await Match.update(
            {scoreA : req.body.scoreA, scoreB : req.body.scoreB, winner : req.body.winner},
            {where : {match_id : req.body.match_id}}
        )
        .then(data => {
            res.json({message : "accepted"})
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: "id false" })
}

exports.newMatch = async function(req,res){
    if (req.body.teamA_id && req.body.teamB_id){
        let match = Match.build({teamA : req.body.teamA_id,teamB :req.body.teamB_id, scoreA : 0, scoreB :0})
        await match.save()
        .then(data => {
            res.json(data)
        })
        .catch(err =>{
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: "name not give" })
}

