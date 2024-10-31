const express = require('express'); //se indica que se requiere express
const app = express(); // se inicia express y se instancia en una constante de nombre app.
const morgan = require('morgan'); //se indica que se requiere morgan
const mysql = require('mysql2/promise');
// settings
app.set('port', 3000); //se define el puerto en el cual va a funcionar el servidor
// Utilities
app.use(morgan('dev')); //se indica que se va a usar morgan en modo dev
app.use(express.json()); //se indica que se va a usar la funcionalidad para manejo de json de express
// Conexión a la base de datos
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'esport_wise'
});

// Rutas Usuarios 

// GET all users
app.get('/user', async (req, res) => {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM users');
    conn.release();
    res.json(rows);
});

// GET user by id
app.get('/user/:id', async (req, res) => {
    const conn = await pool.getConnection();
    const [rows] = await conn.query('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
    conn.release();
    if (rows.length === 0) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.json(rows[0]);
});

// UPDATE user by id
app.put('/user/:id', async (req, res) => {
    const conn = await pool.getConnection();
    const [result] = await conn.query(
        'UPDATE Users SET username=?, fullname=?, email=?, password_hash=?, role_id=? WHERE user_id=?',
        [req.body.username, req.body.fullname, req.body.email, req.body.password_hash, req.body.role_id, req.params.id]
    );
    const [rows] = await conn.query('SELECT * FROM Users WHERE user_id = ?', [req.params.id]);
    conn.release();
    if (rows.length === 0) {
        return res.status(404).send('Usuario no encontrado');
    }
    res.json(rows[0]);
});

// CREATE user
app.post('/user', async (req, res) => {
    const conn = await pool.getConnection();
    const [result] = await conn.query(
        'INSERT INTO Users (username, fullname, email, password_hash, role_id) VALUES (?, ?, ?, ?, ?)',
        [req.body.username, req.body.fullname, req.body.email, req.body.password_hash, req.body.role_id]
    );
    const [rows] = await conn.query('SELECT * FROM Users WHERE user_id = ?', [result.insertId]);
    conn.release();
    res.json(rows[0]);
});

// DELETE user by id
app.delete('/user/:id', async (req, res) => {
    // TODO ADD VALIDATIONS TO DELETE USER
    const conn = await pool.getConnection();
    const [rows] = await conn.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
    conn.release();
    res.json(rows);
});

app.listen(app.get('port'), () => {
    console.log("Servidor funcionando");
}); 