import { Express } from "express";
import { UserEp } from "../endpoint/user.ep";

export function initUserRoutes(app: Express) {
    // PUBLIC ROUTES
    app.post('/api/public/login', UserEp.authenticate);
    app.post('/api/public/register', UserEp.register);
    app.post('/api/public/forgot-password',);
    app.post('/api/public/reset-password',);
    app.post('/api/public/token-validate:token', );

    // AUTH ROUTES
    app.get('/api/auth/self', UserEp.getSelf);
    app.post('/api/auth/update-user', );




}