import mongoose from "mongoose";


//This is the user schema
const userSchema = new mongoose.Schema({
    auth0Id: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required:true 
    },

    name: {
        type: String
    },

    addressLine1: {
        type:String
    },

    city: {
        type:String
    }, 
    country: {
        type:String
    }
})

const User = mongoose.model("User", userSchema);
export default User;

// AuthId is created when the user registers for the first time
// Also the reason why the other fields are not required is because when the user registers with Auth0, we only have access to there and email. But in other to save that to our database base, we will first prepolate the data of each with the info we get from Auth0, which the Authid, and email. The rest of the form will contain what they can fill in order to be properly saved on our own data base with more info