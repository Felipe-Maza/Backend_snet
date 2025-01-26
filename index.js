import express from "express";
import connection from "./database/connection.js";
import bodyParser from "body-parser";
import cors from "cors";
import UserRoutes from "./routers/user.js";
import PublicationRoutes from "./routers/publication.js";
import FollowRoutes from "./routers/follow.js"


// MENSAJE DE BIENVENIDA PARA VERIFICAR QUE TODO FUNCIONE CORRECTAMENTE

console.log("API Node en ejecucion");

//Conexion a la base de datos MONGODB

connection();

//CREAR SERVIDOR DE LA NUBE
const app = express();
const puerto = process.env.PORT || 3900;


//CONFIGURAR CORS PARA HACER LAS PETICIONES CORRECTAMENTE 
app.use(cors({
    origin: '*',
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE'
}));

//DECODIFICAR LOS DATOS DESDE LOS FORMULARIOS PARA CONVERTIRLOS EN OBJETOS JS

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//CONFIGURAR LAS RUTAS DEL APLICATIVO {esto es una ruta general}
app.use('/api/user',UserRoutes);
app.use('/api/publication',PublicationRoutes);
app.use('/api/follow',FollowRoutes);

//RUTA DE PRUEBA 
app.get('/ruta-prueba',(req,res) => {
    return res.status(200).json(
        {
            'id':1,
            'nombre':'Felipe',
            'username':'Elcalvoman'
        }
    );
});

//CONFIGURACION DEL SERVIDOR DE NODE.JS
app.listen(puerto, () => {
    console.log("Servidor de node ejectutandose en el puerto: "+puerto)
});

export default app; 