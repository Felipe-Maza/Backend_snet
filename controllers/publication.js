// ACCIONES DE PRUEBA

export const testpublication = (req,res) =>{
    return res.status(200).send({
        message:"Hola publication"
    });
}