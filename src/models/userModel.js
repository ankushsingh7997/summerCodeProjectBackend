const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    name:{type:String,required:true},
    password:{type:String,required:true},
    isDeleted:{type:Boolean,default:false}
    
    },{timestamps:true});

    module.exports=mongoose.model('user',userSchema);