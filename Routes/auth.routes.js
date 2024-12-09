import { Router } from "express";
import {login, signup, logout} from "../Controllers/auth.controllers.js"
import { schemaValidator } from "../middleware/schemaValidator.middleware.js";
import { validateLogin } from "../schemas/auth.schemas.js";
import { validarSecion } from "../Controllers/auth.controllers.js";

const router = Router();

router.post('/signup', signup);
router.post('/login', schemaValidator(validateLogin), login);
router.post('/logout', logout);
router.get('/validarSecion', validarSecion);

export default router;