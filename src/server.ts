/// <reference path="global.d.ts" />
require('dotenv').config();

import * as express from 'express';
import * as fs from 'fs';
import * as https from 'https';
import * as morgan from 'morgan';
import {urlencoded} from 'body-parser';
import { logRequest } from './middleware/request-logger';
import databaseSetup from './startup/database';
import passportStartup from './startup/passport';
import * as cors from 'cors';
import { Role } from './models/user.model';
import {verifyRole} from "./middleware/verify-role";
import {Authentication} from './middleware/authentication';
import { AppLogger } from './common/logging';
import {handleError} from './middleware/error-handler';
import * as routes from './routes';

const production = process.env.NODE_ENV === "production";
const PORT: any = process.env.PORT || 4000;

databaseSetup();

const app = express();
app.use(logRequest);
app.use(express.json());
app.use(urlencoded({extended: true}));

passportStartup(app);

app.use(morgan('combined'));

if (!production) {
    app.use(cors({
        optionsSuccessStatus: 200,
        origin: '*',
        allowedHeaders: ['Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Authorization, X-Requested-With', 'Cache-Control']
    }));
}

app.use('/api/auth', Authentication.verifyToken);

// added employee routes for vacancy
app.use(['/api/admin', '/api/writter', '/api/reader'], Authentication.verifyToken);
app.use('/api/admin', verifyRole(Role.SUPER_ADMIN, Role.ADMIN));
app.use('/api/guest', verifyRole(Role.GUEST));

if (production) {
    https.createServer({
        key: fs.readFileSync(process.env.SERVER_KEY_PATH || 'server.key'),
        cert: fs.readFileSync(process.env.SERVER_CERT_PATH || 'server.cert')
    }, app).listen(PORT, () => {
        AppLogger.info('--> HTTPS Server successfully started at port :: ' + PORT);
    });
} else {
    app.listen(PORT, () => {
        AppLogger.info('--> Server successfully started at port :: ' + PORT);
    });
}

routes.initRoutes(app);
app.use(handleError);

export default app;