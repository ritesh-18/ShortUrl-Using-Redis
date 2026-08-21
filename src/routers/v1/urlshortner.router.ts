import express from "express"
import { shortUrlController } from "../../controllers/urlshortner.controller";
import { validateRequestBody } from "../../validators";
import { urlRequestSchema } from "../../validators/url.validator";


export const urlShortnerRoutes=express.Router();
urlShortnerRoutes.post("/" ,validateRequestBody(urlRequestSchema), shortUrlController)