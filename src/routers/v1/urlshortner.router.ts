import express from "express"
import {ShortUrlController}from "../../controllers/urlshortner.controller";
import { validateRequestBody } from "../../validators";
import { urlRequestSchema } from "../../validators/url.validator";

const  urlcontrller=new ShortUrlController();
export const urlShortnerRoutes=express.Router();
urlShortnerRoutes.post("/" ,validateRequestBody(urlRequestSchema),  urlcontrller.createShortUrl.bind(urlcontrller))