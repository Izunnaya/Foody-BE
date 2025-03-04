//This is the file that'll handle the business logic for creating a user
import {RequestHandler} from "express"
import User from "../models/userModel"

const createCurrentUser:RequestHandler = async (req, res, next) => {

    // The logic for creating a user
    //============
    //1. Check if the user exists
    //2. Create the user if it doesn't exist
    //3. Return user object to the frontend.
    try {

    const { auth0Id } = req.body
    
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
       res.status(200).send()
        }
        
        const newUser = new User(req.body);
        await newUser.save()
        
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: "Error creating user"})
    }

}

export default {
    createCurrentUser
}