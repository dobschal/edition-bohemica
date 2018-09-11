const mongoose = require("mongoose");

var orderSchema = mongoose.Schema({
    
    products: [
        {
            hasPorto: Boolean,
            title: String,
            subtitle: String,
            isbn: String,
            amount: Number
        }
    ],

    orderId: { type: String, required: true, default: getOrderId },
    totalPrice: { type: Number, required: true },
    totalPorto: { type: Number, required: true },

    modifiedAt: { type: Date, required: true, default: Date.now },

    recipientEmail: { type: String, required: false, default: "" },
    recipientName: { type: String, required: false, default: "" },
    recipientStreet: { type: String, required: false, default: "" },
    recipientHouseNumber: { type: String, required: false, default: "" },
    recipientZipCode: { type: String, required: false, default: "" },
    recipientCity: { type: String, required: false, default: "" },
    recipientCountry: { type: String, required: false, default: "" }
});

function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getOrderId()
{
    let date = new Date();
    return `${date.getFullYear().toString().substr(-2)}${formatNumber2(date.getMonth() + 1)}${formatNumber2(date.getDate())}-${getRandomInt(100000,999999)}`;    
}

function formatNumber2( number )
{
    if( number < 10 )
    {
        return "0" + number;
    } 
    return number;
}

let model = mongoose.model('Order', orderSchema);
module.exports = model;