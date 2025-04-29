//This is the file that'll handle the business logic for creating a user
import {RequestHandler} from "express"
import User from "../models/userModel"
import { Request,Response } from "express"

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

        res.status(201).json(newUser.toObject())
        
    } catch (error) {
        console.log(error);
        res.status(500).json({Message: "Error creating user"})
    }

}

const updateCurrentUser = async (req:Request, res:Response) => {
    // Get all the fields from the request from the FE(When the user submits the form)
    // Get the user we are trying to edit from the database
    // put an error check to if the user exists
    // Save the fields to the DB

    // So there's a problem, as we don't know the MongoDB ID of the user we want to update. All we know is that the user is logged in and they have made a request to update their profile. We also know that when a user is logged in they'll get an acess token in the request. So what we can do is extracting the user's auth0 ID from the token and we use that to get the user from our database.

    try {
        const { name, addressLine1, city, country, } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            res.sendStatus(404).json({ message: "user not found" });
            return;
        }

        user.name = name;
        user.addressLine1 = addressLine1;
        user.city = city;
        user.country = country;
    

        await user.save();

        res.send(user);

    } catch (error) {
        console.log(error);
   res.status(500).json({message:"Error updating user"})
    };
    
}

export default {
    createCurrentUser,
    updateCurrentUser,
}