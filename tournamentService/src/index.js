require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const tournamentController = require("./controllers/tournamentController");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(tournamentController);

// Use PORT_TOURNAMENT instead of PORT_TEAM
const PORT_TOURNAMENT = process.env.PORT_TOURNAMENT || 3004;

app.listen(PORT_TOURNAMENT, () => {
    console.log(`Tournament service running on port ${PORT_TOURNAMENT}`);
});
