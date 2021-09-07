import * as passport from 'passport';
import { AppLogger } from "../common/logging";
import { Util } from "../common/util";
import {NextFunction, Request, Response} from "express";

export class Authentication {

    public static verifyToken(req: Request, res: Response, next: NextFunction) {
        return passport.authenticate('jwt', {session: false}, (err: any, user: any, info: any) => {
            if (err || !user) {
                AppLogger.error(`Login Failed. reason: ${info}`);
                return Util.sendError(res, info);
            }
            req.user = user;
            req.body.user = user._id;
            return next();
        })(req, res, next);
    }
}