const mongoose  = require("mongoose");
const logger = require("../utils/logger");
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?\/~_+-=|\]).{8,32}$/


const userSchema = new mongoose.Schema({
    name: {
        firstName: String,
        lastName: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        validate: {
            validator: password => passwordRegex.test(password),
            message: props => `The password ${props.value} is not in the correct format!`
        },
        required: true,
        select: false
    },
    email: {
        type: String,
        validate: {
            validator: email => emailRegex.test(email),
            message: props => `The email ${props.value} is not in the correct format!`
        },
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        country: String,
        city: String 
    },
    role: [{
        //TODO
    }],
    dealerships: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Dealership"
    }],
    is_blocked: {
        type: Boolean,
        default: false
    },
    is_messaging_blocked: {
        type: Boolean,
        default: false
    },
    is_reviewing_blocked: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
});

userSchema.static.findByUsername = function (username) {
    return this.find({ username: new RegExp(username, "i")})
}

userSchema.static.findByEmail = function (email) {
    return this.find({ email: new RegExp(email, "i")})
}

userSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

userSchema.post("save", function (doc, next) {
    logger.info(`User with username ${doc.username} has been updated!`)
    next();
});

module.exports = mongoose.model("Users", userSchema);