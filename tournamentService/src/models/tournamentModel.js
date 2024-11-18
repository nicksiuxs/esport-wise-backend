const mysql = require("mysql2/promise");

const DB_HOST_TOURNAMENT = process.env.DB_HOST_TOURNAMENT || "localhost";
const DB_USER_TOURNAMENT = process.env.DB_USER_TOURNAMENT || "root";
const DB_PASS_TOURNAMENT = process.env.DB_PASS_TOURNAMENT || "root";
const DB_NAME_TOURNAMENT = process.env.DB_NAME_TOURNAMENT || "esport_wise_tournament";

const connection = mysql.createPool({
    host: DB_HOST_TOURNAMENT,
    user: DB_USER_TOURNAMENT,
    password: DB_PASS_TOURNAMENT,
    database: DB_NAME_TOURNAMENT,
});

// Create a new tournament
async function createTournament(tournament) {
    const { name, game_id, start_date, end_date } = tournament;
    const [result] = await connection.query(
        "INSERT INTO Tournaments (name, game_id, start_date, end_date) VALUES (?, ?, ?, ?)",
        [name, game_id, start_date, end_date]
    );
    const [rows] = await connection.query("SELECT * FROM Tournaments WHERE id = ?", [result.insertId]);
    return rows[0];
}

// Register a team in a tournament
async function registerTeamInTournament(data) {
    const { team_id, tournament_id } = data;
    const [result] = await connection.query(
        "INSERT INTO Team_Tournaments (team_id, tournament_id) VALUES (?, ?)",
        [team_id, tournament_id]
    );
    const [rows] = await connection.query("SELECT * FROM Team_Tournaments WHERE id = ?", [result.insertId]);
    return rows[0];
}

// Record a team's final position in a tournament
async function recordTeamPosition(data) {
    const { team_id, tournament_id, final_position } = data;
    await connection.query(
        "UPDATE Team_Tournaments SET final_position = ? WHERE team_id = ? AND tournament_id = ?",
        [final_position, team_id, tournament_id]
    );
    const [rows] = await connection.query(
        "SELECT * FROM Team_Tournaments WHERE team_id = ? AND tournament_id = ?",
        [team_id, tournament_id]
    );
    return rows[0];
}

// Get tournaments and team positions
async function getTournaments() {
    const [rows] = await connection.query(`
        SELECT t.id, t.name, t.start_date, t.end_date, g.game_name,
               tt.team_id, tt.final_position
        FROM Tournaments t
        LEFT JOIN Team_Tournaments tt ON t.id = tt.tournament_id
        LEFT JOIN esport_wise_team.Games g ON t.game_id = g.id
    `);
    return rows;
}

async function addGame(game) {
    const { id, game_name } = game;

    try {
        console.log("Adding Game:", game); // Log the game details

        let result;

        if (id) {
            // Insert with specified game_id
            result = await connection.query(
                "INSERT INTO esport_wise_team.Games (id, game_name) VALUES (?, ?)",
                [id, game_name]
            );
        } else {
            // Insert without specifying game_id (auto-increment)
            result = await connection.query(
                "INSERT INTO esport_wise_team.Games (game_name) VALUES (?)",
                [game_name]
            );
        }

        const [rows] = await connection.query(
            "SELECT * FROM esport_wise_team.Games WHERE id = ?",
            [result[0].insertId || game_id]
        );
        return rows[0];
    } catch (error) {
        console.error("Error in addGame:", error.message);
        throw new Error(error.message || "Database error while adding game");
    }
}

module.exports = {
    createTournament,
    registerTeamInTournament,
    recordTeamPosition,
    getTournaments,
    addGame,
};
