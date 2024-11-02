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

// // // CREATE user
// router.post('/user', async (req, res) => {
//     const conn = await pool.getConnection();
//     const [result] = await conn.query(
//         'INSERT INTO Users (username, fullname, email, password_hash, role_id) VALUES (?, ?, ?, ?, ?)',
//         [req.body.username, req.body.fullname, req.body.email, req.body.password_hash, req.body.role_id]
//     );
//     const [rows] = await conn.query('SELECT * FROM Users WHERE user_id = ?', [result.insertId]);
//     conn.release();
//     res.json(rows[0]);
// });

// // UPDATE user by id
// router.put('/user/:id', async (req, res) => {
//     const conn = await pool.getConnection();
//     const [result] = await conn.query(
//         'UPDATE Users SET username=?, fullname=?, email=?, password_hash=?, role_id=? WHERE user_id=?',
//         [req.body.username, req.body.fullname, req.body.email, req.body.password_hash, req.body.role_id, req.params.id]
//     );
//     const [rows] = await conn.query('SELECT * FROM Users WHERE user_id = ?', [req.params.id]);
//     conn.release();
//     if (rows.length === 0) {
//         return res.status(404).send('Usuario no encontrado');
//     }
//     res.json(rows[0]);
// });

// // DELETE user by id
// router.delete('/user/:id', async (req, res) => {
//     // TODO ADD VALIDATIONS TO DELETE USER
//     const conn = await pool.getConnection();
//     const [rows] = await conn.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
//     conn.release();
//     res.json(rows);
// });

module.exports = router;
