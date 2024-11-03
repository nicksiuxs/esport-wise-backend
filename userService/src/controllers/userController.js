const { Router } = require("express");
const router = Router();
const userModel = require("../models/userModel");

// GET all users
router.get("/user", async (req, res) => {
    const result = await userModel.getUsers();
    res.json(result);
});

// GET user by id
router.get('/user/:id', async (req, res) => {
    const result = await userModel.getUserById(req.params.id);
    if (result.length === 0) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.json(result[0]);
});

// POST create user
router.post('/user', async (req, res) => {
    const result = await userModel.createUser(req.body);
    res.json(result);
});

// PUT update user
router.put('/user/:id', async (req, res) => {
    const result = await userModel.updateUser(req.body, req.params.id);
    if (!result) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.json(result);
});

// DELETE delete user
router.delete('/user/:id', async (req, res) => {
    const result = await userModel.deleteUser(req.params.id);
    if (!result) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.json(result);
});

module.exports = router;
