import { asynchandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { User } from "../model/users.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { api_response } from "../utils/api_response.js";
import { JsonWebTokenError } from "jsonwebtoken";


const generateRefershTokenAndAccessToken = async(userid) => {
   try {
    const user = await User.findById(userid)

    const refreshtoken = user.generaterefreshtokens()
    const accesstoken = user.generateaccesstokens()

    user.refreshtoken = refreshtoken

    await user.save({ validateBeforeSave: false })

    return {refreshtoken , accesstoken}
   } catch (error) {
    throw new apierror("access and refresh tokens are not generated")
   } 
}


const registeruser = asynchandler(async(req,res) => {                // i can also modify the statuscode like 500,400,
// logic for user registration-:
// take the user input from the frontend
// now check the varification for different inputs
// then we check if the user is already register by checking his email and password
// now we check for avatar file and upload to cloudniry 
// create user object - create entry in db
// remove password and refreshtokenfields from respose
// check for user creation
// return res

const {username,email,fullname,password} = req.body

if([username,email,fullname,password].some((field) =>                       // made by simple if also
    field?.trim() === "") ){
   throw new apierror(400 , "please fill the required fileds")
}

const existedUser =  await User.findOne({
    $or : [{username} , {email}]
})


if(existedUser){
    throw new apierror(409,"username and email is already exsisted") 
}
 const avatarlocalpath = req.files?.avatar?.[0]?.path                      //is used to get the file path of uploaded images from Multer
 const coverImagelocalpath = req.files?.coverImage?.[0]?.path

 if(!avatarlocalpath){
    throw new apierror(409,"please upload your avatar")
 }
 console.log(res.files)
 console.log("File path:", avatarlocalpath )
 console.log("File object:", req.files)

 const avatar = await uploadonCloudinary(avatarlocalpath)                                            //Wait until this async task finishes before moving to the next line.
 const coverImage = await uploadonCloudinary(coverImagelocalpath)

 if(!avatar){
    throw new apierror(400 ,"avatar is not uploaded on coudinary")
 }

const user = await User.create({
    username : username.toLowerCase(),
    email,                                                       // this contain password taht why we create another variable created user to remove password
    avatar : avatar.url,
    coverImage : coverImage?.url || "",
    password,
    fullname
 })
const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createduser){
    throw new apierror(500 , "something went wronge from ourside whilt registering the user")
}

return res.status(201).json(
    new api_response(200,createduser,"user register successfully")                            //this response is sent to the frontend (or Postman while testing).
)
})

const userlogin = asynchandler(async(req,res) =>{
    // by me :--
 // write to , do's for login
 // enter username and password
 // first check if the username and pasword is existed 
 // if not throw error if yes then provide access token 
 // and after some time access token is expire
 // then login again 
 // if user want to login for longer time 
 // regfresh token can be provided to user 
 // so that he dont need to login repeatedly

 // By me(optimal) :-
 // req body -> data
 // username or password 
 // find the user
 // enter password
 // check password
 // generate access and  refresh tokens
 // send cookie
 
 const {username , email , password} = req.body

 if(!(username || email)){
    throw new apierror(400,"please enter username or password");  
 }

 const user = await User.findOne({
    $or : [{username} , {email}]
 }
 )

 if(!user){
    throw new apierror( 404 ,"please register yourself")
 }

 const passwordvalid = await user.ispasswordcorrect(password)

 if(!passwordvalid){
    throw new apierror(404,"invalied user wrong password")
  }

const {refreshtoken , accesstoken} = await generateRefershTokenAndAccessToken(user._id)

const loggedinuser = await User.findById(user._id).select("-password -refreshtoken")

const options = {
    httponly : true,
    secure : true
}

return res
.status(200)
.cookie("refreshtoken" , refreshtoken,options)
.cookie( "accesstoken" , accesstoken,options)
.json(
   new api_response(
        200,
        {
            user : loggedinuser , refreshtoken , accesstoken
        },
        "user logged in successfully"
    )
)

})

const userlogout = asynchandler(async(req,res) => {
User.findByIdAndUpdate(
    req.user._id,
    {
        $set: {
            refreshToken : undefined
        }
    },
    {
    new : true  
    }                   // for accessing updated value
)

const options = {
    httponly : true,
    secure : true
}

return res
.status(200)
.clearCookie("accesstoken" , options)
.clearCookie("refreshtoken" , options)
.json(
    new api_response(200 , {} , "user successfully logout")
)

})

const refreshtoken = asynchandler(async(req,res) => {

    const incommingrefreshtoken = req.cookies.refreshtoken || req.body.refreshtoken

    if(!incommingrefreshtoken){
        throw new apierror(401,"unautherise request")
    }
    
   const decodedtoken = jwt.verify(
        incommingrefreshtoken,
        process.env.REFRESH_TOKEN_SECREAT
    )

    const user = await User.findById(decodedtoken?._id)

    if(!user){
        throw new apierror(401,"invalied refreshtoken") 
  }
  
  if(incommingrefreshtoken !== user?. refreshToken){
    throw new apierror(401,"refresh token is expired or used ")
  }
 
  const options = {
    httponly : true,
    secure: true
  }

  const {newrefreshToken,accesstoken} = generateRefershTokenAndAccessToken(user._id)

 return  res
 .status(200)
 .cookie("accesstoken", accesstoken,options )
 .cookie("refreshtoken",newrefreshToken,options) 
 .json(
    new api_response(
        200,refreshtoken,"token refreshed successfully"
    )
 )

})
export{
    registeruser,
    userlogin,
    userlogout,
    refreshtoken
}