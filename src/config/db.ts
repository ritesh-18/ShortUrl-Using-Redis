import dns from "dns";
import mongoose from "mongoose";
import { serverConfig } from ".";
import logger from "./logger.config";

// This machine's system DNS resolves to a loopback entry that nothing listens on,
// which breaks the SRV lookup that mongodb+srv:// URLs require. A dedicated
// Resolver keeps our servers pinned even when other clients reset the shared
// c-ares channel.
const resolver = new dns.promises.Resolver();
resolver.setServers(["8.8.8.8", "1.1.1.1"]);

async function resolveSrvHosts(host: string): Promise<string[]> {
    const records = await resolver.resolveSrv(`_mongodb._tcp.${host}`);
    return records.map((r) => `${r.name}:${r.port}`);
}

export async function dbConnect() {
    try {
        let url = serverConfig.DB_URL;

        if (url.startsWith("mongodb+srv://")) {
            const parsed = new URL(url);
            const hosts = await resolveSrvHosts(parsed.hostname);
            const auth = parsed.username
                ? `${parsed.username}:${parsed.password}@`
                : "";
            const params = new URLSearchParams(parsed.search);
            params.set("ssl", "true");
            params.set("authSource", "admin");
            url = `mongodb://${auth}${hosts.join(",")}${parsed.pathname}?${params}`;
        }

        await mongoose.connect(url);
        logger.info("Mongo Db has Connected");
    } catch (error) {
        logger.error("DB connection Failed ", error);
        process.exit(1);
    }
}
