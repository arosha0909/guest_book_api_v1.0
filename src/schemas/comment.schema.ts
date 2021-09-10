import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import { IComment } from "../models/comment.model";

const schemaOptions: mongoose.SchemaOptions = {
    _id: true,
    id: false,
    timestamps: true,
    skipVersioning: true,
    strict: false,
    toJSON: {
        getters: true,
        virtuals: true,
        transform: (doc: any, ret: any) => {
            delete ret.path;
            delete ret.isUrl;
        }
    },
};

const commentSchema = new mongoose.Schema({
    rate: {
        type: Schema.Types.Number,
        required: false,
    },
    title: {
        type: Schema.Types.String,
        required: false,
    },
    text: {
        type: Schema.Types.String,
        required: false,
    },
    isActive: {
        type: Schema.Types.Boolean,
        required: false,
    },
}, schemaOptions);

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;