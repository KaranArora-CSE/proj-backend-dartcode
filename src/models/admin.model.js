const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    adminName: {
        required: true,
        type: String,
    }, 
    adminCode: {
        required: true,
        type: String,
    },
    createdAt:{
        type:Date,
        default:() => new Date(Date.now()),
    },
    lastLogin:{
        type:Date,
        default:() => new Date(Date.now()),
    }
})

const adminModel = mongoose.model('admin',adminSchema);
module.exports = adminModel;