import { AppLogger } from "../common/logging";
import {DAdmin, IAdmin} from "../models/admin.model";
import { IUser } from "../models/user.model";
import Admin from "../schemas/admin.schema";
import { UserDao } from "./user.dao";

export namespace AdminDao {
    const populateOptions = [

    ];

    export async function getAllAdmins(): Promise<IAdmin[]> {
        const admins = await Admin.find().populate(populateOptions);
        AppLogger.info(`Got all admins, total: ${admins.length}`);
        return admins;
    }

    export async function getAdminByEmail(email: string): Promise<IUser | null> {
        let admin: IUser = await Admin.findOne({email: email});
        AppLogger.info(`Got admin for email, userID: ${admin ? admin._id : "None"}`);
        return admin;
    }

    export async function getAdmin(adminId: string): Promise<IAdmin> {
        const admin = await Admin.findById(adminId).populate(populateOptions);
        AppLogger.info(`Got admin for ID: ${adminId}`);
        return admin;
    }

    export async function createAdmin(data: DAdmin): Promise<string> {
        const iAdmin = new Admin(data);
        let admin = await iAdmin.save();
        AppLogger.info(`Create profile for user ID: ${admin._id}`);
        return await UserDao.authenticateUser(data.email, data.password);
    }

    export async function updateAdmin(adminId: string, data: Partial<DAdmin>): Promise<IAdmin> {
        const admin = await Admin.findByIdAndUpdate(adminId, {'$set': data});
        AppLogger.info(`Update profile for user ID: ${admin._id}`);
        return getAdmin(admin._id);
    }
}