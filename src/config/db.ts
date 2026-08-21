import dns from "dns";
import mongoose from "mongoose";
import { serverConfig } from ".";
import logger from "./logger.config";

// Node's resolver picks up a loopback DNS entry on this machine, which breaks the
// SRV lookup that mongodb+srv:// URLs need. Point it at public resolvers instead.
dns.setServers(["8.8.8.8", "1.1.1.1"])

const URL=serverConfig.DB_URL
export async function dbConnect(){
    try {
       await mongoose.connect(URL)
        logger.info("Mongo Db has Connected")
    } catch (error) {
        logger.error("DB connection Failed ", error)
        process.exit(1);
    }
}