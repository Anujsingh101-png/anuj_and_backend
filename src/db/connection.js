import mongoose from "mongoose"
import { db_NAME } from "../contrains.js"

const connectDB = async ()=>{
    try{ 
       const connectioninitiate = await mongoose.connect(`${process.env.MONGODB_URI}/${db_NAME}`)
       console.log(`connection is stabilsed on this host == ${connectioninitiate.connection.host}`)
    }catch(error){
      console.log("error found",error)
      process.exit(1)
    }
    }

    export default connectDB