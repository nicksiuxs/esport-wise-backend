const { Router } = require("express");
const axios = require('axios');

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


router.post("/team/member", async (req, res) => {
    const member = req.body;
    const url = `http://localhost:${process.env.PORT_USER}/user/${member.user_id}`;

    const user = await axios.get(url);
    console.log(user)
    const result = await teamModel.addMember(req.body);
    res.json(result);
    res.json('holiii');
});

module.exports = router;