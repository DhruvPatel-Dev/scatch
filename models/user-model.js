const mongoose = require('mongoose');



const userSchemna = mongoose.Schema({
    fullname:{
        type:String,
        minLength:3,
        trim:true,
     },
    email:String,
    password:String,
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product",
    }],
    orders:{
        type:Array,
        default:[]
    },
    contact:Number,
    profile:String

});



module.exports=mongoose.model('user',userSchemna);
