const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ProductSchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
    },
    image:  {
        type:String,
        required: true,
    },
    quantity:{
        type:Number,
        required: true,
    },
    price:{
        type:Number,
        required: true,
    },
    storeId:{
        type:Schema.Types.ObjectId,
        required: true,
        ref: 'User',

    },
    discount:{
        type:String,
        required: true,
    },
    category:{
        type:String,
        required: true,
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);