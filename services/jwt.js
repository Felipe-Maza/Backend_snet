import jwt from 'jwt-simple';
import moment from 'moment';
//import user from '../models/user';

// CLAVE SECRETA
const secret = 'ALGOSECRETO';

// GENERAR TOKEN
const createToken = (user) => {
    const payload = {
        userId: user._id,
        userRol: user.role,
        name: user.name,
        nick: user.nick,
        //FECHA DE EMISION
        iat: moment().unix(),
        expiracion: moment().add(30,'days').unix()
    };
    //DEVOLVER EL JWT DEL TOKEN CODIFICADO
    return jwt.encode(payload,secret);
}

export{
    secret,
    createToken
}