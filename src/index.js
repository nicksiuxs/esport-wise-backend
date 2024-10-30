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
    database: 'almacen'
});



app.listen(app.get('port'), () => {
    console.log("Servidor funcionando");
}); 