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
    try {
        const result = await connection.query("SELECT * FROM teams");
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }

}

/**
 * Retrieves a team from the database by its ID.
 * @param {number} id - The ID of the team to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the team object.
 */
async function getTeamById(id) {
    try {
        const result = await connection.query("SELECT * FROM teams WHERE id = ?", [id]);
        return result[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Asynchronous function to retrieve team information about a user.
 * @param {number} user_id - The ID of the user whose team members are to be retrieved.
 * @returns {Promise<Array>} - A promise that resolves to an array of team members.
 * @throws {Error} - Throws an error if the database query fails.
 */
async function getMyTeam(user_id) {
    try {
        const [result] = await connection.query('SELECT * FROM team_members WHERE user_id = ?', [user_id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
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
    try {
        const { name, logo_url, manager_id, game_id } = team;
        const [result] = await connection.query(
            "INSERT INTO teams (name, logo_url, manager_id, game_id) VALUES (?, ?, ?, ?)",
            [name, logo_url, manager_id, game_id]
        );

        const [rows] = await connection.query('SELECT * FROM teams WHERE id = ?', [result.insertId]);

        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Deletes a team from the database by its ID.
 * @param {number} id - The ID of the team to delete.
 * @returns {Promise<Object|string>} - Returns the deleted team object if successful, or a "Team not found" message if no team was deleted.
 */
async function deleteTeam(id) {
    try {
        const [team] = await connection.query('SELECT * FROM teams WHERE id = ?', [id]);

        const [result] = await connection.query('DELETE FROM teams WHERE id = ?', [id]);

        if (result.affectedRows > 0) {
            return team[0];
        }

        return "Team not found";
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Adds a new member to the team.
 * @param {Object} player - The player object containing team and user information.
 * @param {number} player.team_id - The ID of the team.
 * @param {number} player.user_id - The ID of the user.
 * @returns {Promise<Object>} The newly added team member.
 * @throws {Error} If there is an error during the database query.
 */
async function addMember(player) {
    try {
        const { team_id, user_id } = player;
        const [result] = await connection.query(
            "INSERT INTO team_members (team_id, user_id) VALUES (?, ?)",
            [team_id, user_id]
        );

        const [rows] = await connection.query('SELECT * FROM team_members WHERE team_member_id = ?', [result.insertId]);

        return rows[0];
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Retrieves the members of a team based on the provided team ID.
 * @async
 * @function getMembers
 * @param {number} team_id - The ID of the team whose members are to be retrieved.
 * @returns {Promise<Array>} A promise that resolves to an array of team members.
 * @throws {Error} If there is an error during the database query.
 */
async function getMembers(team_id) {
    try {
        const [result] = await connection.query('SELECT * FROM team_members WHERE team_id = ?', [team_id]);
        return result;
    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = { getTeams, getTeamById, getMyTeam, createTeam, deleteTeam, addMember, getMembers };