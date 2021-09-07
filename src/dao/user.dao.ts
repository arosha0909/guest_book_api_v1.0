import { ApplicationError } from "../common/application-error";
import { AppLogger } from "../common/logging";
import { StringOrObjectId } from "../common/util";
import { IUser } from "../models/user.model";
import User from "../schemas/user.schema";

export namespace UserDao {
    export async function authenticateUser(email: string, password: string, remember?: boolean): Promise<string> {
        const user = await getUserByEmail(email);
        if (user) {
            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                throw new ApplicationError('Incorrect email/password combination!');
            }

            return user.createAccessToken();
        } else {
            throw new ApplicationError('User not found in the system!');
        }
    }

    export async function getUserByEmail(email: string): Promise<IUser | null> {
        console.log(email);
        let user: IUser = await User.findOne({email: email});
        AppLogger.info(`Got user for email, userID: ${user ? user._id : "None"}`);
        return user;
    }

    export async function getUserById(id: StringOrObjectId): Promise<IUser> {
        let user: IUser = await User.findById(id).populate('photo');
        if (!user) {
            throw new ApplicationError("User not found for Id: " + id);
        }

        AppLogger.info(`Got user for id, userID: ${user._id}`);
        user.lastLogin = new Date();
        await user.save();
        return user;
    }

}