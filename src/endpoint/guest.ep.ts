import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { StringOrObjectId, Util } from "../common/util";
import { Validation } from "../common/validation";
import { GuestDao } from "../dao/guest.dao";
import { DGuest } from "../models/guest.model";
import { IUser, Role } from "../models/user.model";
import { DUser } from './../models/user.model';

export namespace GuestEp {
    export function registerValidationRules() {
        return [
            Validation.role(Role.GUEST),
            Validation.email(),
            Validation.password(),
            Validation.noPermissions(),
        ];
    }

    export async function createGuest(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        !errors.isEmpty() ? Util.sendError(res, errors.array()[0]['msg']) :
            GuestDao.createGuest(req.body).then((data: any) => Util.sendSuccess(res, data)).catch(next);
    }



    export async function UploadGuest(req: Request, res: Response, next: NextFunction) {
        const guest: DGuest = req.body;
        const updatingGuest: Partial<DGuest> = {};

        if (guest.firstName) {
            updatingGuest.firstName = guest.firstName;
        }

        if (guest.lastName) {
            updatingGuest.lastName = guest.lastName;
        } 

        if (guest.email) {
            updatingGuest.email = guest.email;
        }

        if (guest.role) {
            updatingGuest.role = guest.role;
        }

        if (guest.permissions) {
            updatingGuest.permissions = guest.permissions;
        }

        if (guest.status) {
            updatingGuest.status = guest.status;
        }

        if (guest.isActive) {
            updatingGuest.isActive = guest.isActive;
        }

        if (guest.photo) {
            updatingGuest.photo = guest.photo;
        }

        if (guest.comment) {
            updatingGuest.comment = guest.comment;
        }

        const updatedGuest = await GuestDao.updatedGuest(req.body.id, updatingGuest);
        return updatedGuest;
    }
}