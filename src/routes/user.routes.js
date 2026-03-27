import { Router } from "express";
import {refreshtoken, registeruser, userlogin, userlogout} from "../controllers/user.controllers.js" 
import { upload } from "../middleware/multer_middleware.js"
import { verifyjwt } from "../middleware/auth_middleware.js";


const router = Router()
router.route("/register").post(
    upload.fields([
        {
            name : "avatar",
            maxCount : 1
        },
        {
            name : "coverImage",
            maxCount : 1
        }
    ]
    ),
    registeruser
)

router.route("/login").post(userlogin)

router.route("/logout").post(verifyjwt , userlogout)

router.route("/refresh-token").post(refreshtoken)

export default router;