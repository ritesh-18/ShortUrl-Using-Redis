import { RedisClientRepository } from "../repository/redis.repository";
import {ShortUrl} from "../repository/shorturl.repository"
import {ShortUrlBody} from "../utils/types/shorturlbody"

export class UrlServices{

    private urlRepo:ShortUrl;
    private redisRepo:RedisClientRepository;
    constructor(){
         this.urlRepo= new ShortUrl();
         this.redisRepo=new RedisClientRepository();

    }
    async createShortUrl(data:ShortUrlBody){
        // create an index and then save it 
        const shorturl=await this.redisRepo.getNextIndex();
        await this.redisRepo.setUrlMapping(String(shorturl) , data.url)
        return await this.urlRepo.createShortUrl({originaUrl:data.url  ,shortUrl:String(shorturl)});
    }
    async readShorturl(shortUrl:string){
        return await this.urlRepo.findShortUrl(shortUrl)
    }
    async updateClicks(shortUrl:string){
        await this.urlRepo.updateClicks(shortUrl)
    }
    async deleteShortUrl(shortUrl:string){
        await this.urlRepo.deleteUrl(shortUrl)
    }
}