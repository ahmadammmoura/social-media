const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required:true,
        min:5,
        max:20,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        min:6,
        required:true,
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)


module.exports = mongoose.model("user",userSchema);