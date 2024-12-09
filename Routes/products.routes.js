import { Router } from "express";
import { postProduct, getProduct, deleteProduct, updateProduct } from "../Controllers/products.controllers.js";
import { protectRoutes } from "../middleware/protectRoutes.js";

const router = Router();

router.get('/products', protectRoutes, getProduct);
router.post('/newProduct',protectRoutes, postProduct);
router.put('/updateProduct/:_id', protectRoutes, updateProduct);
router.delete('/deleteProduct/:_id', protectRoutes, deleteProduct);

export default router;