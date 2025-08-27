import { body  } from "express-validator";
export const parkValidations = [
    body('park_id').trim().notEmpty().withMessage('park id is required'),
    body('english_name').trim().notEmpty().withMessage('english name is required'),
    body('arabic_name').trim().notEmpty().withMessage('arabic name is required'),
    body('image').trim().notEmpty().withMessage('image is required'),
    body('location').trim().notEmpty().withMessage('location is required')
]