import { Router } from "express";
const router = Router();
import { testfollow } from "../controllers/follow.js";
//DEFINIR LAS RUTAS 
router.get('/test-follow',testfollow);

//EXPORTAR EN ROUTER
export default router;