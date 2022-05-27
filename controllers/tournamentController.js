const { json } = require('express/lib/response');
const db = require('../models/index')
let Team  = db.Team;
let Tournament = db.Tournament;
let Organizer = db.Organizer;
let Match  = db.Match;
let Link = db.link_Tournament_Team;

exports.updateScore = async function(req,res){
    if(req.body.team_id && req.body.tournament_id){
        await Link.update({ score : req.body.score},{ where : {teamTeamId : req.body.team_id, tournament_id : req.body.tournament_id}})
        .then( data => {
            res.json(data);
        })
        .catch( err => {
            res.status(500).json({ message: err.message });
        })
    }
    else res.status(400).json({ message: "parameter not give" })
}

exports.create = async function(req,res){
    if (req.body.name && req.body.organizer_id){
        await Tournament.create({name : req.body.name})
        .then(async function(tournament){
            await Organizer.findOne({where : {organizer_id : req.body.organizer_id}})
            .then(async function(organizer){
                await organizer.addTournament(tournament)
                .then((data) => {
                    res.json(tournament)
                })
                .catch((err) => {
                    res.status(500).json({ message: err.message })
                })
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: "name not give" })
};

exports.addTeam = async function(req,res){
    if (req.body.tournament_id && req.body.team_id){
        await Tournament.findOne({where : {tournament_id : req.body.tournament_id}})
        .then(async function(tournament){
            await Team.findOne({where : {team_id : req.body.team_id}})
            .then(async function(team){
                await tournament.addTeam(team)
                .then((data) => {
                    res.json(team)
                })
                .catch((err) => {
                    res.status(500).json({ message: err.message })
                })
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
        Link.update({ score : 0 },{ where : {teamTeamId : req.body.team_id, tournament_id : req.body.tournament_id}})
    }
    else res.status(400).json({ message: "name not give" })
};

exports.getTournamentTeams = async function(req,res){
    if (req.params.tournament_id){
        await Tournament.findOne({
            where : {tournament_id : req.params.tournament_id},
            attributes : [],
            include :[{
                model : Team,
                attributes : ['team_id','name', 'member', 'email'],
            }]
        }
        )
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: "id not give" })
}

exports.getTournamentMatches = async function(req,res){
    if (req.params.tournament_id){
        await Tournament.findOne({
            where : {tournament_id : req.params.tournament_id},
            attributes : [],
            include :[{
                model : Match,
                attributes : ["match_id","scoreA","scoreB","teamA","teamB", "winner"],
            }]
        }
        )
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: "id not give" })
}

exports.getTournament = async function(req,res){
    await Tournament.findAll( 
        {attributes : ['tournament_id', 'name', 'organizerOrganizerId']})
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.status(500).json({ message: err.message })
    })
}

exports.getMyTournament = async function(req,res){
    if (req.params.organizer_id){
        await Tournament.findAll({
            attributes : ['tournament_id', 'name', 'organizerOrganizerId'],
            where : { organizerOrganizerId : req.params.organizer_id}
        })
        .then((data) => {
            res.json(data)
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: "organizer not here" }) 
}

exports.addMatches = async function(req,res){
    if (req.body.tournament_id && req.body.match_id){
        await Tournament.findOne({where : {tournament_id : req.body.tournament_id}})
        .then(async function(tournament){
            await Match.findOne({where : {match_id : req.body.match_id}})
            .then(async function(match){
                await tournament.addMatch(match)
                .then((data) => {
                    res.json({message : "accepted"})
                })
                .catch((err) => {
                    res.status(500).json({ message: err.message })
                })
            })
            .catch((err) => {
                res.status(500).json({ message: err.message })
            })
        })
        .catch((err) => {
            res.status(500).json({ message: err.message })
        })
    }
    else res.status(400).json({ message: "name not give" })
}
