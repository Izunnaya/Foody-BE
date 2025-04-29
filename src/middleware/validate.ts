//This is the file where fields from a request will validated, to check if they correct and of the expected types

import { NextFunction, Response, Request} from "express"
import { body, validationResult } from "express-validator"

const handleValidationErrors = async (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
        res.sendStatus(400).json({ errors: errors.array() });
        return;
    }
    next()
}

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name Must be a String"),
    body("addressLine1").isString().notEmpty().withMessage("Address must be a String"),
    body("city").isString().notEmpty().withMessage("City must be a String"),
    body("country").isString().notEmpty().withMessage("Country must be a String"),
    handleValidationErrors,
]
