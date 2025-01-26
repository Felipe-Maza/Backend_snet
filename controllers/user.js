import User from "../models/user.js"
import bcrypt from "bcrypt"

// METODO REGISTRO DE USUARIOS 
export const register = async (req,res) =>{
    try {
        // OBTENER LOS DATOS DE LAS PETICIONES
        let params = req.body;

        // VALIDACIONES DE LOS DATOS OBTENIDOS
        if(!params.name || !params.last_name || !params.email || !params.password || !params.nick){
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            });
        }

        //CREAR EL OBJETO PARA GUARDAR EN LA BASE DE DATOS
        let user_to_save = new User(params);

        //BUSCA SI EXISTE ALGUN USUARIO CON EL MISMO EMAIL O NICK
        const existingUser = await User.findOne({
            $or: [
                {email: user_to_save.email.toLowerCase()},
                {nick: user_to_save.nick.toLowerCase()}
            ]
        });

        //SI ENCUENTRA UN USUARIO, DEVUELVE UN MENSAJE INDICANDO QUE YA EXISTE
        if(existingUser){
            return res.status(409).send({
                status:"error",
                message: "El usuario ya existe"
            });
        }


        //CIFRAR LA CONTRASEÑA 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user_to_save.password,salt);

        user_to_save.password = hashedPassword;

        //GUARDAR EL USUARIO EN LA BASE DE DATOS
        await user_to_save.save();

        //DEVOLVER EL USUARIO REGISTRADO
        return res.status(200).json({
            message: "Registro exitoso",
            params,
            user_to_save
        })
    } catch (error) {
        //MANEJO DE ERRORES
        console.log("Hubo un error en el registro de usuario",error);
        // DEVUELVE MENSAJE DE ERROR CON DETALLE  
        return res.status(500).send({
            status: "error",
            message: "Error en el registro de usuario"
        })
    }
}