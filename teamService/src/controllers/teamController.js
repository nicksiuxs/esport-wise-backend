const { Router } = require("express");
const router = Router();
const teamModel = require("../models/teamModel");

// GET all teams
router.get("/team", async (req, res) => {
    const result = await teamModel.getTeams();
    res.json(result);
});

// GET team by ID
router.get("/team/:id", async (req, res) => {
    const result = await teamModel.getTeamById(req.params.id);
    res.json(result[0]);
});

// POST create a new team
router.post("/team", async (req, res) => {
    const result = await teamModel.createTeam(req.body);
    res.json(result);
});

// DELETE team by ID   
router.delete("/team/:id", async (req, res) => {
    const result = await teamModel.deleteTeam(req.params.id);
    res.json(result);
});

module.exports = router;