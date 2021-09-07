import { ApplicationError } from "../common/application-error";
import {NextFunction, Request, Response} from "express";
import { Role } from "../models/user.model";

export function verifyRole(...roles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (roles.includes(<Role>req.user.role)) {
            next();
        } else {
            throw new ApplicationError("Permission denied.");
        }
    };
}
