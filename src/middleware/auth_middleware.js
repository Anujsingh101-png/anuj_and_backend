import { apierror } from "../utils/apierror";
import { asynchandler } from "../utils/asynchandler";
import jwt from "jsonwebtoken"
import User from "../model/users.model.js"

export const verifyjwt = asynchandler(async(req, _,next) => {

    try {
        const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer ", "")
    
        if(!token){
            throw new apierror(202,"dont get the token from cookie")
        }
    
        const Decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECREAT)
    
        if(!Decodedtoken){
            throw new apierror(404,"invalied access token")
        }
    
        const user = await User.findById(Decodedtoken?._id).select("-password -refreshtoken")
    
        if(!user){
            //NEXT_VIDEO
            throw new apierror(404,"invalied access token")
        }

        req.user = user
        next();
    } catch (error) {
        throw new apierror(401,error?.message || "invalied access token")
    }

})