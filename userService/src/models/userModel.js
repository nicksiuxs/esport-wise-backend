const mysql = require("mysql2/promise");

const DB_HOST_USER = process.env.DB_HOST_USER || "localhost";
const DB_USER_USER = process.env.DB_USER_USER || "root";
const DB_PASS_USER = process.env.DB_PASS_USER || "root";
const DB_NAME_USER = process.env.DB_NAME_USER || "esport_wise_user";

const connection = mysql.createPool({
    host: DB_HOST_USER,
    user: DB_USER_USER,
    password: DB_PASS_USER,
    database: DB_NAME_USER,
});

/**
 * Retrieves all users from the database.
 * @function getUsers
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
async function getUsers() {
    const result = await connection.query("SELECT * FROM users");
    return result[0];
}

/**
 * Retrieves a user from the database by their ID.
 * @function getUserById
 * @param {number} id - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
async function getUserById(id) {
    const result = await connection.query('SELECT * FROM users WHERE id = ?', id);
    return result[0];
}

/**
 * Creates a new user in the database.
 * @param {Object} user - The user object containing user details.
 * @param {string} user.name - The first name of the user.
 * @param {string} user.lastname - The last name of the user.
 * @param {string} user.birthdate - The birthdate of the user.
 * @param {string} user.email - The email address of the user.
 * @param {string} user.username - The username of the user.
 * @param {string} user.password - The password of the user.
 * @param {number} user.role_id - The role ID of the user.
 * @returns {Promise<Object>} The created user object.
 */
async function createUser(user) {

    const [result] = await connection.query(
        'INSERT INTO users (name, lastname, birthdate, email,  username, password, role_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user.name, user.lastname, user.birthdate, user.email, user.username, user.password, user.role_id]
    );

    const [rows] = await connection.query('SELECT * FROM Users WHERE id = ?', [result.insertId]);

    return rows[0];
}

module.exports = { getUsers, getUserById, createUser };
