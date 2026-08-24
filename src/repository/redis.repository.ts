import { serverConfig } from "../config";
import { redis } from "../config/redis";


export class RedisClientRepository {
    async getNextIndex(): Promise<number> {
        if (!redis.isOpen) {
            await redis.connect();
        }
        const key = serverConfig.REDIS_COUNTER_KEY;
        const index: number = await redis.incr(key)
        console.log("inc value is ", index)
        return index;

    }
    async setUrlMapping(shortcode: string, originalurl: string): Promise<void> {
        const key = `key:${shortcode}`;
        if (!redis.isOpen) {
            await redis.connect();
        }
        await redis.set(key, originalurl, {
            expiration: {
                type: "EX",
                value: 24 * 60 * 60
            }
        })
        return;
    }
    async getUrl(shortcode: string): Promise<string | null> {
        if (!redis.isOpen) {
            await redis.connect();
        }
       const key = `key:${shortcode}`
       const data= await redis.get(key)
       return data;
    }
    async removeUrl(shortcode: string) {
        if (!redis.isOpen) {
            await redis.connect();
        }
        const key = `key:${shortcode}`
        return await redis.del(key)
    }
}