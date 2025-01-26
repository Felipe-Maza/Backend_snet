// ACCIONES DE PRUEBA 

    export const testUser = (req,res) =>{
        return res.status(200).send({
            message:"Hola"
        });
    }