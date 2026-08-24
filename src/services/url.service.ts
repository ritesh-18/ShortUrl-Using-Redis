import { serverConfig } from "../config";
import { RedisClientRepository } from "../repository/redis.repository";
import { ShortUrl } from "../repository/shorturl.repository"
import { convertbase62 } from "../utils/base62";
import { NotFoundError } from "../utils/errors/app.error";
import { ShortUrlBody } from "../utils/types/shorturlbody"

export class UrlServices {

    private urlRepo: ShortUrl;
    private redisRepo: RedisClientRepository;
    constructor() {
        this.urlRepo = new ShortUrl();
        this.redisRepo = new RedisClientRepository();

    }
    async createShortUrl(data: ShortUrlBody) {
        // create an index and then save it 
        const index = await this.redisRepo.getNextIndex();
        //converti into base62
        const shorturl = convertbase62(index)
        await this.redisRepo.setUrlMapping(String(shorturl), data.url)
        await this.urlRepo.createShortUrl({ originaUrl: data.url, shortUrl: String(shorturl) });
        return `${serverConfig.BASE_URL}/${shorturl}`
    }
    async readShorturl(shortUrl: string) {
        //fetch from redis , if not then from db
        const redisData = await this.redisRepo.getUrl(shortUrl);
        if (redisData) {
            //also update the click
            this.urlRepo.updateClicks(shortUrl)
            return redisData
        }
        const dbData = await this.urlRepo.findShortUrl(shortUrl);
        if (!dbData) {
            throw new NotFoundError("url not found")
        } this.urlRepo.updateClicks(shortUrl)
        this.redisRepo.setUrlMapping(dbData.shortUrl , dbData.originaUrl)
        return dbData.originaUrl
    }
    async updateClicks(shortUrl: string) {
        await this.urlRepo.updateClicks(shortUrl)
    }
    async deleteShortUrl(shortUrl: string) {
        await this.urlRepo.deleteUrl(shortUrl)
    }
}