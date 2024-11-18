const { Router } = require("express");
const axios = require('axios');
const { createResponse } = require("../../../utils/utils");

const router = Router();
const teamModel = require("../models/teamModel");

// GET all teams
router.get("/team", async (req, res) => {
    try {
        const result = await teamModel.getTeams();
        res.status(200).json(createResponse("success", result, "Teams fetched successfully"));
    } catch (error) {
        res.status(500).json(createResponse("error", null, error.message));
    }

});

// GET team by ID
router.get("/team/:id", async (req, res) => {
    try {
        const result = await teamModel.getTeamById(req.params.id);

        if (result.length === 0) {
            res.status(404).json(createResponse("error", null, `Team with id ${req.params.id} not found`));
            return;
        }
        res.status(200).json(createResponse("success", result, "Teams fetched successfully"));
    } catch (error) {
        res.status(500).json(createResponse("error", null, error.message));
    }
});


// POST create a new team
router.post("/team", async (req, res) => {
    try {
        const result = await teamModel.createTeam(req.body);
        res.status(200).json(createResponse("success", result, "Teams fetched successfully"));
    } catch (error) {
        res.status(500).json(createResponse("error", null, error.message));
    }
});

// DELETE team by ID   
router.delete("/team/:id", async (req, res) => {
    const result = await teamModel.deleteTeam(req.params.id);
    res.json(result);
});

// POST add member to team
router.post("/team/member", async (req, res) => {
    const member = req.body;
    const url = `http://localhost:${process.env.PORT_USER}/user/${member.user_id}`;

    const response = await axios.get(url);
    const user = response.data;

    if (typeof user === 'string') {
        res.json(user);
        return;
    }

    const result = await teamModel.addMember(req.body);
    result.user = user;
    res.json(result);
});

// GET members of a tema
router.get("/team/:id/members", async (req, res) => {
    try {
        const result = await teamModel.getMembers(req.params.id);
        res.json(result);
    } catch (error) {

    }
});

module.exports = router;