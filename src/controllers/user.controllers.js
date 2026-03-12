import { asynchandler } from "../utils/asynchandler.js";

const registeruser = asynchandler(async(req,res) => {
    res.status(200).json({                            // i can also modify my server codes 400,500 etc etc
    message : "dhurunder the revenge"
})
})

export{
    registeruser,
}