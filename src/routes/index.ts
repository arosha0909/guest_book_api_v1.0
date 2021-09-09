import {Express, Request, Response} from "express";
import {Util} from "../common/util";
import { initUserRoutes } from "./user.route";

export function initRoutes(app: Express) {
    /* TOP LEVEL */
    app.get('/api', (req: Request, res: Response) => Util.sendSuccess(res, "GuestBook™ API"));
    // app.get('/api', (req: Request, res: Response) => Util.renderStaticPage(res, "./documentation/index.html"));

    initUserRoutes(app);

     /* ALL INVALID REQUESTS */
     app.all('*', (req: Request, res: Response) => Util.sendError(res, "Route Not Found"));
}