const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    order: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Order",
        required: true
    },
    shipmentAddress: {
        address: { 
            type: String, 
            required: true
        },
        city: { 
            type: String, 
            required: true 
        },
        postalCode: { 
            type: String,
            required: true 
        },
        country: {
            type: String,
            required: true
        },
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("payment", paymentSchema);