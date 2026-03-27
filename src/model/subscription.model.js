import mongoose , {Schema} from "mongoose";

const subscriptionSchema = new Schema({
subscriber : {
    type : Schema.Typeof.Objectid,           //one who is sudscrbing
    ref : "User"
},
channel: {
    type:Schema.Typeof.Objectid,               //one to whome thw subscriber is subscribing
    ref : "user"
},
} ,{timestamp : true})

export const Subscription = mongoose.model("Subscription",subscriptionSchema)