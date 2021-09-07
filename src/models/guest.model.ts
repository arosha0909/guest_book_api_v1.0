import { DUser, IUser } from "./user.model";
import * as mongoose from "mongoose";
import { ObjectIdOr, StringOrObjectId } from "../common/util";
import { IComment } from "./comment.model";

interface CommonAttributes {}

export interface DGuest extends CommonAttributes, DUser  {
    comment?: StringOrObjectId;
};

export interface IGuest extends CommonAttributes, IUser, mongoose.Document {
    comment?: ObjectIdOr<IComment>
}
