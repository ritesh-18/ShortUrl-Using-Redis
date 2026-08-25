import { UrlServices } from "../services/url.service"
import { appProcedure } from "../routers/trpc/context"
import { z } from "zod";
import logger from "../config/logger.config";
import { InternalServerError } from "../utils/errors/app.error";
const urlService = new UrlServices();
export const trpcUrlController = {
    create: appProcedure.input(
        z.object({
            originalUrl: z.string().url("Invalid Url")
        })
    ).mutation(async ({ input }) => {
        try {
            const url = input.originalUrl;
            const resData = await urlService.createShortUrl({ url })
            return resData;
        } catch (error) {
            logger.error("Something went wrong while creating short url")
            throw new InternalServerError("Error while creating short url ")
        }

    }
    ),
    read: appProcedure.input(
        z.object({
            shortCode: z.string()
        })
    ).query(async ({ input }) => {
        try {
            const data = await urlService.readShorturl(input.shortCode);
            return data;
        } catch (error) {
            logger.error("Something went wrong while getting original url")
            throw new InternalServerError("Error while getting original url ")
        }
    })
}