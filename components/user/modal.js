const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    givenName: {
        type: String
    },
    familyName: {
        type: String
    },
    google: {
        id: String
    },
    facebook: {
        id: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
    },
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand'
    },
    space: {
        type: mongoose.Schema.ObjectId,
        ref: 'Space'
    },
}, {
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);