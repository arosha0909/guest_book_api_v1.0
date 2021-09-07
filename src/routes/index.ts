import {Express, Request, Response} from "express";
import {Util} from "../common/util";

export function initRoutes(app: Express) {
    /* TOP LEVEL */
    app.get('/api', (req: Request, res: Response) => Util.sendSuccess(res, "BuyAndSelling™ API"));
    // app.get('/api', (req: Request, res: Response) => Util.renderStaticPage(res, "./documentation/index.html"));


     /* ALL INVALID REQUESTS */
     app.all('*', (req: Request, res: Response) => Util.sendError(res, "Route Not Found"));
}