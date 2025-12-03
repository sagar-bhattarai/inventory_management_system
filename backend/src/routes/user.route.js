import {Router} from "express";
import { loginUser, guestUser } from "../controllers/user.controller.js"

const router = Router();

router.route("/").get(guestUser);
router.route("/login").post(loginUser);

export default router;