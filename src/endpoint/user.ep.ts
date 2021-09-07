import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Util } from "../common/util";
import { Validation } from "../common/validation";
import { UserDao } from "../dao/user.dao";
import { Role } from "../models/user.model";
import { GuestEp } from "./guest.ep";

export namespace UserEp {
    export function authValidationRules() {
        return [
            Validation.email(),
            Validation.password()
        ];
    }

    export async function authenticate(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return Util.sendError(res, errors.array()[0]['msg']);
        }

        UserDao.authenticateUser(req.body.email, req.body.password).then((token: string) => {
            Util.sendSuccess(res, token);
        }).catch(next);
    }

    export async function register(req: Request, res: Response, next: NextFunction) {
        try {
            switch(req.body.role) {
                case Role.GUEST:
                    await GuestEp.createGuest(req, res, next);
                break;
            }
        } catch (error) {
            Util.sendError(res, error);
        }
    }

    export function getSelf(req: Request, res: Response, next: NextFunction) {
        UserDao.getUserById(req.user._id).then(user => {
            Util.sendSuccess(res, user);
        }).catch(next);
    }
}