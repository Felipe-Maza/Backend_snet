import express from "express";
import connection from "./database/connection.js";

// MENSAJE DE BIENVENIDA PARA VERIFICAR QUE TODO FUNCIONE CORRECTAMENTE

console.log("API Node en ejecucion");

//Conexion a la base de datos MONGODB

connection();

//CREAR SERVIDOR DE LA NUBE
const app = express();
const puerto = process.env.PORT || 3900;


//CONFIGURACION DEL SERVIDOR DE NODE.JS
app.listen(puerto, () => {
    console.log("Servidor de node ejectutandose en el puerto: "+puerto)
});

export default app; 