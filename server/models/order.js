const mongoose  = require("mongoose");

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "Ordered" //Ordered, Approved/Declined, Shipped
    },
    products: [{
        product: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Car",
            required: true
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("order", orderSchema);