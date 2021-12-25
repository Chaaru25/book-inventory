const mongoose = require("mongoose")

const Schema = mongoose.Schema

const BookSchema = Schema({
    title: {
        type: String,
        required: true
    },

    imageUrl: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number,
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Book", BookSchema)