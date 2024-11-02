const { Router } = require("express");
const router = Router();
const teamModel = require("../models/teamModel");

// GET all teams
router.get("/team", async (req, res) => {
    const result = await teamModel.getTeams();
    res.json(result);
});

module.exports = router;