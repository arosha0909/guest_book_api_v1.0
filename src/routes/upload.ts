import {Express} from "express";
import {UploadEp} from "../endpoint/upload.ep";
import multer = require("multer");
import {uploadPath} from "../config";

const upload = multer({dest: `${uploadPath}/`}).single('upload');

export function initUploadRoutes(app: Express) {
    /* AUTH ROUTES */
    app.post('/api/public/upload', upload, UploadEp.uploadFile);

    /* ADMIN ROUTES */
    app.post('/api/admin/upload/delete/:uploadId', UploadEp.uploadFile);


}