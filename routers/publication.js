import { Router } from "express";
const router = Router();
import { testpublication } from "../controllers/publication.js";

//DEFINIR LAS RUTAS 
router.get('/test-publication',testpublication);

//EXPORTAR EN ROUTER
export default router;