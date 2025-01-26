import { Router } from "express";
const router = Router();
import { testUser } from "../controllers/user.js";  

//DEFINIR LAS RUTAS 
router.get('/test-user',testUser);

//EXPORTAR EN ROUTER 
export default router;