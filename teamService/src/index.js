require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const teamController = require("./controllers/teamController");

const app = express();
app.use(morgan("dev"));
app.use(express.json());


app.use(teamController);

const PORT_TEAM = process.env.PORT_TEAM || 3003;

app.listen(PORT_TEAM, () => {
    console.log(`Microservicio Equipo ejecutandose en el puerto ${PORT_TEAM}`);
});
