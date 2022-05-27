let express = require('express');
let router = express.Router();

const matchController = require('./controllers/matchController');
const organizerController = require('./controllers/organizerController');
const teamController = require('./controllers/teamController');
const tournamentController = require('./controllers/tournamentController');

router.post('/signIn', organizerController.signIn);
router.post('/signUp', organizerController.signUp);
router.get('/organizer/:organizer_id', organizerController.organizerByID);

router.post('/team',teamController.createTeam);
router.put('/team', teamController.modifyTeam);
router.get('/team/:team_id',teamController.getTeam);
router.get('/teams', teamController.getTeams);

router.post('/tournament/create',tournamentController.create);
router.post('/tournament/addTeam',tournamentController.addTeam);
router.post('/tournament/addMatch',tournamentController.addMatches);
router.get('/tournament/teams/:tournament_id', tournamentController.getTournamentTeams);
router.get('/tournament/matches/:tournament_id', tournamentController.getTournamentMatches);
router.get('/tournament', tournamentController.getTournament);
router.get('/tournament/:organizer_id', tournamentController.getMyTournament);
router.put('/tournament/updateScore', tournamentController.updateScore);

router.post('/match', matchController.newMatch);
router.put('/match', matchController.editMatch);

module.exports = router;