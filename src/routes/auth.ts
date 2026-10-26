import { Router } from "express";
import {
    adminUsersController,
    currentUserController,
    loginController,
    registerController
} from "../controllers/authController.js";
import { authenticateToken, authorizeRole } from "../middleware/authenticateToken.js";
import loginRateLimit from "../middleware/loginRateLimit.js";

const router = Router();

router.post("/login", loginRateLimit, loginController);
router.post("/register", registerController);
router.get("/me", authenticateToken, currentUserController);
router.get(
    "/admin/users",
    authenticateToken,
    authorizeRole("ADMIN"),
    adminUsersController
);

export default router;