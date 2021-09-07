import * as mongoose from "mongoose";

export interface DUpload {
    type: string;
    category: string;
    path: string;
    name?: boolean;
    isUrl?: boolean;
    notes?: boolean;
}

export type IUpload = DUpload & mongoose.Document;
