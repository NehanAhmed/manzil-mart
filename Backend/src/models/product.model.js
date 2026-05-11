const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    vendor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["active","draft","inactive"],
        default:"active"
    },
    category:{
        type:String,
        required:true,
        enum:["electronics","fashion","home","beauty","sports","books","toys","automotive","health","jewelry","other","all"],
        default:"all"
    },


},{timestamps:true})

const productModel = mongoose.model("Products", productSchema)

module.exports = productModel   