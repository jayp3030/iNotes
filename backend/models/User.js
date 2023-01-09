const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema ({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    },
    date:{
        type: Date,
        default:Date.now
    }
})

const User = mongoose.model('user' , UserSchema);

module.exports = User;