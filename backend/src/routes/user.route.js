import {Router} from "express";
import { loginUser, guestUser, logoutUser } from "../controllers/user.controller.js";
import authMiddleWare from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/").get(guestUser);
router.route("/login").post(loginUser);
router.route("/logout/").delete(authMiddleWare, logoutUser);

export default router;