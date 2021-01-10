const mongoose = require('mongoose')

const sizeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter size name '],
            unique: true,
        },
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Size', sizeSchema, 'sizes')
