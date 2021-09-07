import databaseSetup from "../startup/database";
import * as mongoose from 'mongoose';
import seed from "./seeds";

require('dotenv').config();

async function runSeed() {
    await databaseSetup();

    await seed();

    await mongoose.disconnect();
}

runSeed();
