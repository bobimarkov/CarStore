const mongoose  = require("mongoose");

const dealershipSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxLength: 2000
    },
    bannerURL: String,
    manager: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    dealers: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    }],
    cars: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Car"
    }],
    orders: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Order"
    }],
    payments: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Payment"
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Dealership", dealershipSchema);