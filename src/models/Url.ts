import mongoose ,{Document , Schema}from "mongoose";




 interface Urls extends Document{
     originaUrl:string
     shortUrl:string
     created_at:Date
     updated_at:Date
}
const schema=new Schema<Urls>({
    originaUrl:{type:String , required:true},
    shortUrl:{type:String , required:true}

}, {timestamps:true})


///create a model
export const UrlModel=mongoose.model('Urls' , schema)