import { asynchandler } from "../utils/asynchandler.js";
import { apierror } from "../utils/apierror.js";
import { User } from "../model/users.model.js";
import { uploadonCloudinary } from "../utils/cloudinary.js";
import { api_response } from "../utils/api_response.js";

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
console.log("email :" , email);

if([username,email,fullname,password].some((field) =>                       // made by simple if also
    field?.trim() === "") ){
   throw new apierror(400 , "please fill the required fileds")
}

const existedUser = User.findOne({
    $or : [{username} , {email}]
})

if(exsistedUser){
    throw new apierror(409,"username and email is already exsisted") 
}
 const avatarlocalpath = req.files?.avatar[0]?.path                      //is used to get the file path of uploaded images from Multer
 const coverImagelocalpath = req.files?.coverImagelocal[0]?.path

 if(!avatarlocalpath){
    throw new apierror(409,"please upload your avatar")
 }

 const avatar = await uploadonCloudinary(avatarlocalpath)                                            //Wait until this async task finishes before moving to the next line.
 const coverImage = await uploadonCloudinary(coverImagelocalpath)

 if(!avatar){
    throw new apierror(400 ,"avatar is not uploaded on coudinary")
 }

const user = await User.create({
    username : username.toLowerCase(),
    email,
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

return res.status(201).JSON(
    new api_response(200,createduser,"user register successfully")
)


})

export{
    registeruser,
}