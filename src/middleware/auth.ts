import dotenv from 'dotenv';
dotenv.config(); 
import { auth } from "express-oauth2-jwt-bearer";
import { Request, Response, NextFunction } from "express";
import Jwt  from 'jsonwebtoken';
import User from '../models/userModel';

//This is how you add custom properties to the express request
declare global{
  namespace Express{
    interface Request{
      userId?: string;
      auth0Id?: string;
    }

  }
}
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
  tokenSigningAlg: 'RS256',
});


export const jwtParse = async (req:Request, res: Response, next:NextFunction) => {
  const { authorization } = req.headers
  
  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(401);
    return;
  }
  const token = authorization.split(" ")[1];

  try {
    
    const decoded = Jwt.decode(token) as Jwt.JwtPayload;

    const auth0Id = decoded.sub;

    const loggedInUser = await User.findOne({ auth0Id });

    if (!loggedInUser) {
      res.sendStatus(401);
      return;
    }

    //this is where you append the decoded token into the request that'll processed in UpdateMyUser route
    req.auth0Id = auth0Id as string;
    req.userId = loggedInUser._id.toString()
    next()

    // The above properties before the "next" function will throw an erroe because, they custom express properties we are trying to add. To solve this, just go to the top of the page and do global declaration so that typescript understands

  } catch(error) {
    res.sendStatus(401);
    return;
  }

}

// What this code is doing is that whenver we add the jwtCheck function as middleware to our routes, then Express is going to pass the request onto this auth function. Then, what this function will do behing the scenes is to check the authorization header for the bearer token. Remember in the frontend we sent the authorization header, which had the bearer token in it to the backend. So that'll get passed through this function, then behind the scenes it'll connect to our Oauth server and verify if the token it recived is from a logged in user.

/**
 * This middleware function, jwtCheck, is used to protect the createUser route.
 *
 * When jwtCheck is attached to the createUser route, every incoming request to that endpoint
 * is processed by this middleware before reaching your actual route handler.
 *
 * Here's what happens:
 *
 * 1. It examines the request's Authorization header for a Bearer token.
 *    (Your frontend sends this Bearer token along with the request.)
 *
 * 2. It communicates with your OAuth provider (e.g., Auth0) to verify that the token is valid
 *    and that it belongs to an authenticated user.
 *
 * 3. If the token is valid, the middleware allows the request to proceed to the createUser handler.
 *    If the token is missing or invalid, the request is blocked.
 *
 * This ensures that only authenticated users can access the createUser route.
 */
