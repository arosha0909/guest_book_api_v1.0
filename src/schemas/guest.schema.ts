import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IGuest } from "../models/guest.model";
import {Role} from "../models/user.model";
import User, { UserSchemaOptions } from "./user.schema";


export const Guest = User.discriminator<IGuest>('Guest',
    new mongoose.Schema({
        comment: {
            type: Schema.Types.ObjectId,
            required: true,
        }
    }, UserSchemaOptions), Role.GUEST);

export default Guest;
