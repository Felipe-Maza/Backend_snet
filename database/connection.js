import { connect } from "mongoose"; // Asegúrate de que sea 'connect', no 'connection'
import dotenv from "dotenv";

dotenv.config();

const connectToDB = async () => { // Cambié el nombre a 'connectToDB'
    try {
        await connect(process.env.MONGODB_URI); // Asegúrate de que esta línea usa el método 'connect'
        console.log("Conectado correctamente a MongoDB");
    } catch (error) {
        console.log("No se pudo conectar a la base de datos MongoDB", error);
        throw new Error("NO SE PUDO");
    }
};

export default connectToDB; // Cambia el nombre aquí también
