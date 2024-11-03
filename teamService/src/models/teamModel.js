const mysql = require("mysql2/promise");

const DB_HOST_TEAM = process.env.DB_HOST_TEAM || "localhost";
const DB_USER_TEAM = process.env.DB_USER_TEAM || "root";
const DB_PASS_TEAM = process.env.DB_PASS_TEAM || "root";
const DB_NAME_TEAM = process.env.DB_NAME_TEAM || "esport_wise_team";

const connection = mysql.createPool({
    host: DB_HOST_TEAM,
    user: DB_USER_TEAM,
    password: DB_PASS_TEAM,
    database: DB_NAME_TEAM,
});

/**
 * Retrieves all teams from the database.
 * @async
 * @function getTeams
 * @returns {Promise<Array>} A promise that resolves to an array of team objects.
 */
async function getTeams() {
    const result = await connection.query("SELECT * FROM teams");
    return result[0];
}

/**
 * Retrieves a team from the database by its ID.
 * @param {number} id - The ID of the team to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the team object.
 */
async function getTeamById(id) {
    const result = await connection.query("SELECT * FROM teams WHERE id = ?", [id]);
    return result[0];
}

/**
 * Creates a new team in the database.
 * @param {Object} team - The team object containing team details.
 * @param {string} team.name - The name of the team.
 * @param {string} team.logo_url - The URL of the team's logo.
 * @param {number} team.manager_id - The ID of the team's manager.
 * @param {number} team.game_id - The ID of the game the team is associated with.
 * @returns {Promise<Object>} The result of the database query.
 */
async function createTeam(team) {
    const { name, logo_url, manager_id, game_id } = team;
    const [result] = await connection.query(
        "INSERT INTO teams (name, logo_url, manager_id, game_id) VALUES (?, ?, ?, ?)",
        [name, logo_url, manager_id, game_id]
    );

    const [rows] = await connection.query('SELECT * FROM Teams WHERE id = ?', [result.insertId]);

    return rows[0];
}

/**
 * Deletes a team from the database by its ID.
 * @param {number} id - The ID of the team to delete.
 * @returns {Promise<Object|string>} - Returns the deleted team object if successful, or a "Team not found" message if no team was deleted.
 */
async function deleteTeam(id) {
    const [team] = await connection.query('SELECT * FROM teams WHERE id = ?', [id]);

    const [result] = await connection.query('DELETE FROM teams WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
        return team[0];
    }

    return "Team not found";
}

module.exports = { getTeams, getTeamById, createTeam, deleteTeam };