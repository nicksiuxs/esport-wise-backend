const
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

/**
 * Updates a user in the database and returns the updated user.
 * @param {Object} updatedUser - The user data to update.
 * @param {string} updatedUser.name - The user's first name.
 * @param {string} updatedUser.lastname - The user's last name.
 * @param {string} updatedUser.birthdate - The user's birthdate.
 * @param {string} updatedUser.email - The user's email address.
 * @param {string} updatedUser.username - The user's username.
 * @param {string} updatedUser.password - The user's password.
 * @param {number} updatedUser.role_id - The user's role ID.
 * @param {number} id - The ID of the user to update.
 * @returns {Promise<Object>} The updated user.
 */
async function updateUser(updatedUser, id) {
    const [result] = await connection.query(
        'UPDATE users SET name=?, lastname=?, birthdate=?, email=?, username=?, password=?, role_id=? WHERE id=?',
        [updatedUser.name, updatedUser.lastname, updatedUser.birthdate, updatedUser.email, updatedUser.username, updatedUser.password, updatedUser.role_id, id]
    );

    const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);

    return rows[0];
}

/**
 * Deletes a user from the database by their ID.
 * @param {number} id - The ID of the user to delete.
 * @returns {Promise<Object|string>} - Returns the deleted user object if successful, or "User not found" if no user was deleted.
 */
async function deleteUser(id) {
    const [user] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);

    const [result] = await connection.query('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
        return user[0];
    }

    return "User not found";
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
