import { createClient } from "redis";
import { serverConfig } from ".";
import logger from "./logger.config";


export const redis =  createClient({
    url:serverConfig.REDIS_URL
})


redis.on("error" , (err)=>{
    logger.error("Redis connection failed : " , err)
})

redis.on("connect" , ()=>{
    logger.info("Redis connected successfully")
})


export async function initRedis(){
    try {
        await redis.connect()
    } catch (error) {
        logger.error(error)
        throw error
    }
}