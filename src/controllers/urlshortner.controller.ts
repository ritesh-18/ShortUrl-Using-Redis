import{Response , Request , NextFunction} from "express"
import logger from "../config/logger.config";
import {UrlModel} from '../models/Url'
export const shortUrlController=async (req:Request , res:Response , next:NextFunction)=>{
   try {
    const body=req.body;
    logger.info("short url created !!!!")
    const newurls = new UrlModel({originaUrl:body.url    ,  shortUrl:"abc.com" });
    await newurls.save();
    res.json({
        message:"Sort url created"
    })
   } catch (error) {
      logger.error("somethings went wrong while creating short url!!!")
      throw new Error("somethings went wrong")
    
   }
}