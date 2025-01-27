import User from "../models/user.js"
import bcrypt from "bcrypt";
import { createToken } from "../services/jwt.js";

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

//METODO DE PRUEBA 
export const testUser = (req,res) =>{
    return res.status(200).send({
        message:"Hola Usuario",
        user:req.user
    });
}

// METODO DE AUNTENTICACION DE USUARIOS (LOGIN)

export const login = async (req, res) => {
    try {
        // OBTENER LOS PARAMETROS DEL BODY
        let params = req.body;

        // VALIDAR PARAMETROS: EMAIL,PASSWORD
        if (!params.email || !params.password) {
            return res.status(400).send({
                status: "Error",
                message: "No envió el email o el password"
            });
        }

        // BUSCAR EN LA BASE DE DATOS SI EXISTE EL EMAIL RECIBIDO   
        const user = await User.findOne({email: params.email.toLowerCase()});

        // BUSCAR SI EXISTE EL USUARIO
        if (!user) {
            return res.status(404).send({
                status: "Error al buscar",
                message: "Usuario no encontrado"
            });
        }

        // COMPROBAR LA CONTRASEÑA
        const validPassword = await bcrypt.compare(params.password, user.password);

        // SI LA CONTRASEÑA ES INCORRECTA
        if (!validPassword) {
            return res.status(401).send({
                status: "Error password",
                message: "Contraseña incorrecta"
            });
        }

        // GENERAR EL TOKEN DE AUTENTICACION 
        const token = createToken(user);

        // DEVOLVER EL TOKEN
        if(!token){
            return res.status(400).send({
                status: "Error token",
                message: "Error al enviar el token"
            })
        }else{
            return res.status(200).json({
                status: "success",
                message: "Token enviado exitosamente",
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    last_name: user.last_name,
                    email: user.email,
                    nick: user.nick,
                    image: user.image,
                    create_user: user.created_at
                }
            });
        }


        // DEVOLVER EL USUARIO REGISTRADO
        return res.status(200).json({
            status: "success",
            message: "Inicio de sesión exitoso",
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error en el login: ", error);

        return res.status(500).send({
            status: "Error",
            message: "Ocurrió un error inesperado en el login"
        });
    }
}

//METODO PARA MOSTRAR EL PERFIL DEL USUARIO 

