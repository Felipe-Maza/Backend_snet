import { Router } from "express";
const router = Router();
import {register } from "../controllers/user.js";  

//DEFINIR LAS RUTAS 
router.post('/test-register',register)

//EXPORTAR EN ROUTER 
export default router;