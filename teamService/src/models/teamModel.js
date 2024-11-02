const e = require("express");
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

module.exports = { getTeams };