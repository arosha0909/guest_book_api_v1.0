import { Types } from "mongoose";
import {check} from "express-validator";
import { Role } from "../models/user.model";

export const Validation = {
    email: () => check('email').not().isEmpty().withMessage('Email is required!').isEmail().normalizeEmail().withMessage('Invalid email address and Check again!'),
    password: () => check('password').isString().not().isEmpty()
        .withMessage('Password is required!')
        .isLength({min: 6, max: 40})
        .withMessage('Password must be at least 6 chars long & not more than 40 chars long!')
        .not().isIn(['123', 'password', 'god', 'abc']).withMessage('Do not use a common word as the password')
        .matches(/\d/).withMessage('Password must contain a number!'),
    role: (role: Role) => check('role').equals(role).withMessage('Unauthorized user role!'),
    noPermissions: () => check('permissions').not().exists(),
    objectId: (key: string = "_id") => check(key).not().isEmpty().withMessage(`${key} cannot be empty`).custom((v) => isObjectId(v)).withMessage(`${key} is not a valid mongoDb objectID`),
    upload: (key: string = "upload") => check().not().isEmpty().withMessage(`${key} cannot be empty`).custom((v) => isObjectId(v)).withMessage(`${key} is invalid`),
    uploads: (key: string = "uploads") => check(`${key}.*._id`).not().isEmpty().withMessage(`${key} objects cannot be empty`).custom((v) => isObjectId(v)).withMessage(`${key} objects are invalid`),
}

export function isObjectId(v: string): boolean {
    return Types.ObjectId.isValid(v) && Types.ObjectId(v).toHexString() === v;
}