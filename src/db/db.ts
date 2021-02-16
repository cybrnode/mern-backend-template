import mongoose from 'mongoose';

import config from '../config/config';
import { createLogger } from '../util/logger';

const serverConfig = config();
const logger = createLogger(-__filename);
const DB_URL = serverConfig.MONGODB_URI;

function initDatabase() {
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
    mongoose.set("useUnifiedTopology", true);

    mongoose.connect(serverSettings.MONGODB_URI as any)
        .then(() => {
            logger.info("Connection established to database");
            logger.debug(`DATABASE URL: ${serverSettings.MONGODB_URI}`);
            initOfflineDeviceChecker();
        })
        .catch((err) => {
            logger.info("Error in establishing connection with database");
            logger.debug(`DATABASE URL ${serverSettings.MONGODB_URI}`);
            logger.error(`error ${err}`);
        });

}

module.exports.initDatabase = initDatabase;