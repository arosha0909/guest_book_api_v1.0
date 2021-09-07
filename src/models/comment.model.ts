import * as mongoose from "mongoose";

interface CommonAttributes {
    rate: string;
    title: string;
    text: string;
    isActive?: boolean;
}

export interface DComment extends CommonAttributes {}

export interface IComment extends CommonAttributes, mongoose.Document {}

