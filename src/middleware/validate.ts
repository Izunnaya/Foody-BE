//This is the file where fields from a request will validated, to check if they correct and of the expected typez

import { body } from "express-validator"

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name Must be a String"),
    body("addressLine1").isString().isEmpty().withMessage("Address must be a String"),
    body("city").isString().isEmpty().withMessage("City must be a String"),
    body("country").isString().isEmpty().withMessage("Country must be a String")
]
