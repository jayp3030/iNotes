const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema ({

    title:{
        type : String,
        required : true
    },
    description:{
        type : String,
        required : true
    },
    tag:{
        type : String,
        default : 'general'
    },
    date:{
        type:date,
        default:Date.now
    }
})

module.exports = mongoose.model('notes' , NotesSchema);