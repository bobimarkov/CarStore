const mongoose  = require("mongoose");

const messageSchema = new mongoose.Schema({
    from: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    to: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true,
        maxLength: 2000
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("message", messageSchema);