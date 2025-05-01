import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {type:String,required:true},
    type: {type:String,required:true},
    image: {type:String,required:true},
    createdAt: {type:Date,default:Date.now},
    updatedAt: {type:Date,default:Date.now}
})

const categoryModel = mongoose.models.category || mongoose.model("category",categorySchema);

export default categoryModel;