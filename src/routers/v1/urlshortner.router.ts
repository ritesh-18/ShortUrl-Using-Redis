import express from "express"
import {ShortUrlController}from "../../controllers/urlshortner.controller";
import { validateRequestBody, validateRouteParams } from "../../validators";
import { urlparams, urlRequestSchema } from "../../validators/url.validator";

const  urlcontrller=new ShortUrlController();
export const urlShortnerRoutes=express.Router();
urlShortnerRoutes.post("/" ,validateRequestBody(urlRequestSchema),  urlcontrller.createShortUrl.bind(urlcontrller))
urlShortnerRoutes.get("/:shortCode",validateRouteParams(urlparams),urlcontrller.getShortUrl.bind(urlcontrller))