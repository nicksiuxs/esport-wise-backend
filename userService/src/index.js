require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const userController = require("./controllers/userController");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use(userController);

const PORT_USER = process.env.PORT_USER || 3002;

app.listen(PORT_USER, () => {
    console.log(`Microservicio Usuario ejecutandose en el puerto ${PORT_USER}`);
});
