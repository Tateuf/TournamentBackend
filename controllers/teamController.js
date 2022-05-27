const db = require('../models/index')
let Team  = db.Team;
let Tournament = db.Tournament;
let Organizer = db.Organizer;
let Match  = db.Match;

exports.getTeam = async function(req,res){
    if (req.params.team_id){
        await Team.findOne({where : {team_id : req.params.team_id}})
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
    }
    else res.status(400).json({ message: 'Team not found' });
}
    

exports.createTeam = async function(req,res){
    if(req.body.name){
        let team = Team.build({name: req.body.name, member : req.body.member, email : req.body.email})
        await team.save()
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    }
    else{
        res.status(400).json({ message: 'Team not found' })
    }
    
}

exports.modifyTeam = async function(req,res){
    if (req.body.team_id){
        await Team.update(
            { name: req.body.name, member : req.body.member, email: req.body.email },
            {where : {team_id : req.body.team_id}}
        )
        .then(data => {
            res.json({message : 'accepted'});
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: 'Team not found' })
}

exports.getTeams = async function(req,res){
    await Team.findAll()
    .then(data => {
        res.json(data)
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
}

