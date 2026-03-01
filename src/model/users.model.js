import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import JsonWebToken  from "jsonwebtoken";
import { decrypt } from "dotenv";

const userSchema = new Schema({
    username : {
        type : "string",
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
        index : true                  // for optimise searching in mongoodb
    },
    email :{
        type : "string",
        required : true,
        lowercase : true,
        unique : true,
        trim : true,
    },
    fullname :{
        type : "string",
        required : true,
        lowercase : true,
        trim : true,
        index : true
    },
    avatar : {
        type : "string",                //   connection with a cloudenary environment
         required : true,
    },
    coverimage : {
        type : "string"            // clouednary environment
    },
    watchistory : [
       { 
        type : Schema.Types.ObjectID,
        ref : "Videos"
       } 
   ],
   password : {
    string : "string",
    required : [true , "password must be required"]                  // it can be used for every true field
   }
},{timestamps : true})

userSchema.pre("save" , async function (next) {                         // encrypting password middleware
if(!this.isModified("password"))  return next();
   this.password = bcrypt.hash(this.password,10)
   next()
})

userSchema.methods.ispasswordcorrect = async function (password) {
 return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateaccesstokens = function () {
     return JsonWebToken.sign(
        {
            _id : this._id,
            email : this.email,
            username : this.username
        },
        process.env.ACCESS_TOKEN_SECREAT,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generaterefreshtokens = function () {
    return JsonWebToken.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECREAT,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema)