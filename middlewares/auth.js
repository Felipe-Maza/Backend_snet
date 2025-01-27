//IMPORTACION DE MODULOS 
import jwt from 'jwt-simple';
import moment from 'moment';
import {secret} from '../services/jwt.js' // IMPORTAMOS LA CLAVE SECRETA

//FUNCION DE AUTENTICACION 
export const ensureAuth = (req,res,next) =>{
    if(!req.headers.authorization){
        return res.status(403).send({
            status: "Error",
            message: "La peticion no tiene la cabezera de autenticacion"
        });
    }

//LIMPIAR EL TOKEN
const token = req.headers.authorization.replace(/['"]+/g,'').replace("Bearer ","");


//DECODIFICACION DE TOKEN
try {
    let payload = jwt.decode(token,secret);

    //COMPROBAR SI EL TOKEN HA EXPIRADO (FECHA DE EXPIRACION ES MAS ANTIGUA QUE LA ACTUAL)
    if(payload.expiracion <= moment.unix()){
        return res.status(401).send({
            status: "Error",
            message: "La token ha expirado"
        });
    }

    //AGREGAMOS DATOS DEL USUARIO
    req.user = payload;

} catch (error) {
    console.log("Ha ocurrido un error inesperado");

    return res.status(404).send({
        status:"Error",
        message:"Token no valido"
    })
}

next();
//EJECUCION DEL METODO 
}


