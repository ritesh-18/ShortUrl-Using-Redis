import { Response, Request, NextFunction } from "express"
import logger from "../config/logger.config";
import { UrlServices } from "../services/url.service";
import { InternalServerError } from "../utils/errors/app.error";

export class ShortUrlController {
   private urlService: UrlServices;
   constructor() {
      this.urlService = new UrlServices();
   }
   async createShortUrl(req: Request, res: Response, next: NextFunction) {
      try {
         const data = req.body;
         const dbdata = await this.urlService.createShortUrl(data)
         logger.info("short url created!!!")
         res.status(201).json({
            success: true,
            data: dbdata
         })
      } catch (error) {
         logger.error("Somethings went wrong while creating short url")
         next(new InternalServerError("Could not create short url"));

      }
   } async getShortUrl(req: Request, res: Response, next: NextFunction) {
      try {
         //fetch from redis if not then db
         const data = await this.urlService.readShorturl(req.params['shortCode'])
         res.status(201).json({
            success: true,
            url: data
         })
      } catch (error) {
         logger.error("Somethings went wrong while fetching short url")
         next(new InternalServerError("Could not get short url"));
      }

   } async updateShortUrl(req: Request, res: Response, next: NextFunction) {

   } async deleteShortUrl(req: Request, res: Response, next: NextFunction) {

   }
}