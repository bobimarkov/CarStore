const mongoose  = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        maxLength: 200
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    }
}, {
    timestamps: true
})

module.exports = reviewSchema;