import { Router } from "express";
import {coverimageupdate, refreshtoken, registeruser, userlogin, userlogout} from "../controllers/user.controllers.js" 
import { upload } from "../middleware/multer_middleware.js"
import { verifyjwt } from "../middleware/auth_middleware.js";
import {refreshtoken,changecurrentpassword,currentuser,updateaccountdetails,avatarupdate,getUserChannelProfile,GetWatchHistory} from "../controllers/user.controllers.js"


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
router.route("/change-password").post(verifyjwt,changecurrentpassword)
router.route("/currentuser").post(verifyjwt,currentuser)
router.route("/updateaccountdetails").patch(verifyjwt,updateaccountdetails)
router.route("/avatarupdate").patch(verifyjwt,upload.single("avatar"),avatarupdate)
router.route("/coverimageupdate").patch(verifyjwt,upload.single("coverimageupdate"),coverimageupdate)
router.route("/c/:username").get(verifyjwt,getUserChannelProfile)
router.route("/history").get(verifyjwt,GetWatchHistory)
export default router;