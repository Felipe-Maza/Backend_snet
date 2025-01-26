import { Router } from "express";
const router = Router();
import {register,login,testUser } from "../controllers/user.js";  

//DEFINIR LAS RUTAS 
router.get('/test-login',testUser)
router.post('/test-register',register);
router.post('/login',login);


//EXPORTAR EN ROUTER 
export default router;