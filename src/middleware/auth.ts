import dotenv from 'dotenv';
dotenv.config(); 
import { auth } from "express-oauth2-jwt-bearer";
export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
  tokenSigningAlg: 'RS256',
});

// What this code is doing is that whenver we add the jwtCheck function as middleware to our routes, then Express is going to pass the request onto this auth function. Then, what this function will do behing the scenes is to check the authorization header for the bearer token. Remember in the frontend we sent the authorization header, which had the bearer token in it to the backend. So that'll get passed through this function, then behing the scenes it'll connect to our Oauth server and verify if the token it recived is from a logged in user. 