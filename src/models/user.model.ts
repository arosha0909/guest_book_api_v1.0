import * as mongoose from "mongoose";
import { ObjectIdOr, StringOrObjectId } from "../common/util";
import { IUpload } from "./upload.model";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
    MODERATOR = 'MODERATOR',
    GUEST = "GUEST",
}

export enum Permission {
    MANAGE_CUSTOMERS = "MANAGE_CUSTOMERS",
    MANAGE_CONTACT_MESSAGES = "MANAGE_CONTACT_MESSAGES",
    MANAGE_SERVICE = "MANAGE_SERVICE",
    MANAGE_UPLOAD = "MANAGE_UPLOAD",
    MANAGE_BLOG = "MANAGE_BLOG",
    MANAGE_PAYMENTS = "MANAGE_PAYMENTS",
    MANAGE_EMAIL_SUBSCRIPTIONS = "MANAGE_EMAIL_SUBSCRIPTIONS",
}

interface CommonAttributes {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role?: Role;
    permissions?: Permission[];
    status?: boolean;
    lastLogin?: Date;
    isActive?: boolean;
}

export interface DUser extends CommonAttributes {
    _id?: StringOrObjectId;
    photo?: StringOrObjectId;
}

export interface IUser extends CommonAttributes, mongoose.Document {

    photo?: ObjectIdOr<IUpload>;

    createAccessToken(): string;

    comparePassword(password: string): Promise<boolean>;

    hasPermission(...permissions: Permission[]): boolean;
}
