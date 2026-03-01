import dotenv from "dotenv"
import connectDB from "./db/connection.js"

dotenv.config({
    path : './env'
})



connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000) , () => {
    console.log(`server is stabilsed connection on the port ${process.env.PORT || 8000}`);
    }
})
.catch((error) => {
    console.log(`connection is not stabilsed to the port ${process.env.PORT || 8000}`)
})










/*
( async() => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${db_NAME}`)
        app.on("errrror",(error) => {
            console.log("app dont connect")
            throw error
        })
        app.listen(process.env.PORT , () => {
            console.log(`app is listening on port 
                ${process.env.PORT}`);
        })
    } catch (error) {
        console.log("error");
        throw err
    }
})()
*/