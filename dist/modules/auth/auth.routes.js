import express from "express";
import { AuthController } from "./auth.controller.js";
const router = express.Router();
router.post("/signup", AuthController.signup);
router.post("/login", AuthController.login);
export default router;
//# sourceMappingURL=auth.routes.js.map