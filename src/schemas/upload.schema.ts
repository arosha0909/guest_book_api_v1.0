import * as mongoose from "mongoose";
import {Schema} from "mongoose";
import { IUpload } from "../models/upload.model";


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

const uploadSchema = new mongoose.Schema({
    type: {
        type: Schema.Types.String,
        required: true,
    },
    category: {
        type: Schema.Types.String,
        required: false,
    },
    path: {
        type: Schema.Types.String,
        required: true,
    },
    name: {
        type: Schema.Types.String,
        required: false,
    },
    isUrl: {
        type: Schema.Types.Boolean,
        required: true,
        default: false
    },
    notes: {
        type: Schema.Types.String,
        required: false,
    },
}, schemaOptions);

uploadSchema.virtual('url').get(function () {
    return this.isUrl ? this.path : process.env.FILE_ACCESS_URL + '/' + this._id;
});

const Upload = mongoose.model<IUpload>('Upload', uploadSchema);
export default Upload;
