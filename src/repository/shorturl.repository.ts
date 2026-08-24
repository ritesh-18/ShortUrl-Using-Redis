import { UrlModel ,Urls} from "../models/Url";
import { ShortUrlData } from "../utils/types/shorturlbody";
export class ShortUrl{
     async createShortUrl(data:ShortUrlData):Promise<Urls>{
          const url=new UrlModel(data)
          await url.save()
          return url;
     }
     async findShortUrl(shortUrl:string):Promise<Urls|null>{
          return await UrlModel.findOne({shortUrl})
     }
     async updateClicks(shortUrl:string):Promise<void>{
          await UrlModel.findOneAndUpdate({shortUrl} , {$inc:{ clicks:1}})
          return;

     }
     async deleteUrl(shortUrl:string):Promise<void>{
          await UrlModel.findByIdAndDelete({shortUrl})
          return;

     }



}