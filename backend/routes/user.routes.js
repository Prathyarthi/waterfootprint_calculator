import { Router } from "express";
import { signup, signin, getUser, changePassword, refreshAccessToken, logout } from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/signup").post(
    upload.fields([
        {
            name: "profile",
            maxCount: 1
        }
    ]),
    signup
);

router.route("/signin").post(signin);
router.route("/getUser").get(verifyJWT, getUser);

router.route("/change-password").patch(verifyJWT, changePassword);

router.route("/refresh-token").post(refreshAccessToken);
router.route("/logout").post(verifyJWT, logout)
// Routes   

export default router