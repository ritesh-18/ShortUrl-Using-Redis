import{Response , Request , NextFunction} from "express"
import logger from "../config/logger.config";
import { UrlServices } from "../services/url.service";

export class ShortUrlController{
   private urlService:UrlServices;
   constructor(){
      this.urlService=new UrlServices();
   }
   async createShortUrl(req:Request , res:Response,next:NextFunction){
    try {
      const data=req.body;
      const dbdata=await this.urlService.createShortUrl(data)
      logger.info("short url created!!!")
      res.status(201).json({
         success:true,
         data:dbdata
      })
    } catch (error) {
      logger.error("Somethings went wrong while creating short url")
      throw new Error()
      
    }
   }async getShortUrl(req:Request , res:Response,next:NextFunction){

   }async updateShortUrl(req:Request , res:Response,next:NextFunction){

   }async deleteShortUrl(req:Request , res:Response,next:NextFunction){

   }
}