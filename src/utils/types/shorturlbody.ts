

export interface ShortUrlBody{
       url:string,
       ttl?:number,
       shortcode?:string
}
export interface ShortUrlData{
    originaUrl:string,
    shortUrl:string
}