
import { AppLogger } from '../common/logging';
import { StringOrObjectId } from '../common/util';
import { DUser, IUser } from './../models/user.model';
import User from './../schemas/user.schema';
import { UserDao } from './user.dao';
import { Guest } from './../schemas/guest.schema';
import { DGuest, IGuest } from '../models/guest.model';

export namespace GuestDao {
    export async function createGuest(data: DGuest): Promise<string> {
        const iGuest = new Guest(data);
        let guest = await iGuest.save();
        AppLogger.info(`Create profile for user ID: ${guest._id}`);
        return await UserDao.authenticateUser(data.email, data.password);
    }

    export async function updatedGuest(guestId: StringOrObjectId, data: Partial<DUser>): Promise<IGuest> {
        // @ts-ignore
        const updatedGuest = await Guest.findByIdAndUpdate(Types.ObjectId(guestId), {'$set': data}, {new: true});
        AppLogger.info(`update job guest for ID: ${updatedGuest.id}`);
        return updatedGuest;
    }
}