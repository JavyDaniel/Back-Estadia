import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";

const router = Router();

router.get('/chatUsers/:rol', getAllUsers);

export default router;