const { Router } = require("express");
const tournamentModel = require("../models/tournamentModel");
const { verifyToken } = require("../middleware/authMiddleware");
const { createResponse } = require("../utils/utils");

const router = Router();

// POST: Create a new tournament
router.post("/tournament", verifyToken, async (req, res) => {
    const { name, game_id, start_date, end_date } = req.body;

    try {
        if (req.userRole !== "manager" && req.userRole !== "organizer") {
            return res
                .status(403)
                .json(createResponse("error", null, "Only managers or organizers can create tournaments"));
        }

        const result = await tournamentModel.createTournament({ name, game_id, start_date, end_date });
        res.status(201).json(createResponse("success", result, "Tournament created successfully"));
    } catch (error) {
        res.status(500).json(createResponse("error", null, error.message));
    }
});

// POST: Register a team in a tournament
router.post("/tournament/team", verifyToken, async (req, res) => {
    const { team_id, tournament_id } = req.body;

    try {
        if (req.userRole !== "manager") {
            return res
                .status(403)
                .json(createResponse("error", null, "Only managers can register teams in tournaments"));
        }

        const result = await tournamentModel.registerTeamInTournament({ team_id, tournament_id });
        res.status(201).json(createResponse("success", result, "Team registered successfully"));
    } catch (error) {
        res.status(500).json(createResponse("error", null, error.message));
    }
});

// PUT: Record a team's final position
router.put("/tournament/team/position", verifyToken, async (req, res) => {
    const { team_id, tournament_id, final_position } = req.body;

    try {
        if (req.userRole !== "manager") {
            return res
                .status(403)
                .json(createResponse("error", null, "Only managers can update team positions"));
        }

        const result = await tournamentModel.recordTeamPosition({ team_id, tournament_id, final_position });
        res.status(200).json(createResponse("success", result, "Final position recorded successfully"));
    } catch (error) {
        res.status(500).json(createResponse("error", null, error.message));
    }
});

// GET: View tournaments and team positions
router.get("/tournament", async (req, res) => {
    try {
        const result = await tournamentModel.getTournaments();
        res.status(200).json(createResponse("success", result, "Tournaments retrieved successfully"));
    } catch (error) {
        res.status(500).json(createResponse("error", null, error.message));
    }
});

module.exports = router;
