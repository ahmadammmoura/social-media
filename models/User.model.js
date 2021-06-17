const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    userName : {
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
    passWord:{
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
    },
    desc:{
        type:String,
        min:25,
        max:100
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationShip:{
        type:Number,
        enum:[1,2,3]
    }

},
{timestamps:true}
)


module.exports = mongoose.model("user",userSchema);