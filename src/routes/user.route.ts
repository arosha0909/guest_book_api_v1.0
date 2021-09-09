import { Express } from "express";
import { GuestEp } from "../endpoint/guest.ep";
import { UserEp } from "../endpoint/user.ep";

export function initUserRoutes(app: Express) {
    // PUBLIC ROUTES
    app.post('/api/public/login', UserEp.authenticate);
    app.post('/api/public/register', UserEp.register);
    app.post('/api/public/email-exists', UserEp.isEmailExists);
    app.post('/api/public/forgot-password',); // yet not develop
    app.post('/api/public/reset-password',); // yet not develop
    app.post('/api/public/token-validate:token', ); // yet not develop

    // AUTH ROUTES
    app.get('/api/auth/self', UserEp.getSelf);
    app.post('/api/auth/update-user', UserEp.updateUser);

    app.get('/api/auth/get-all-guest', GuestEp.getAllGuest);




}