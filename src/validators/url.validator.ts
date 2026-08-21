import { z } from 'zod'




export const urlRequestSchema = z.object({
    url: z.string().min(1),
    ttl: z.number().optional(),
    code: z.string().min(1).optional()



})
export const urlResponseSchema = z.object({
    shortUrl: z.string(),
    success: z.boolean(),
    message: z.string()
})

// body should contains - url , ttl(opt) ,shortcode(opt)