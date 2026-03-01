import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
 
const videosSchema = new Schema({
    videofile : {
        type : "string",                              // coaudnary url
        required : true
    },
    thumbnail : {
        type : "string",                              // coaudnary url
        required : true
    },
    title : {
        type : "string",                              
        required : true
    },
    discription : {
        type : "string",                              
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    views : {
        type :Number,
        default : 0
    },
    ispublished : {
        type : Boolean,
        default : true 
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "Users"
    }

},{timestamps : true})

videosSchema.plugin(mongooseAggregatePaginate)

export const Videos =  mongoose.model("Videos", videosSchema)