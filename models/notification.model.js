const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
    {
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     // required: [true, 'User is require'],
        //     ref: 'User',
        // },
        // object: {
        //     type: String,
        //     enum: ["user", "all"],
        //     required: [true, 'object is require'],
        //     default: "all"
        // },
        subject: {
            type: String,
            enum: ['order', 'product', 'news', 'sale', 'other'],
            default: 'other',
        },
        title: {
            type: String,
            required: [true, 'Title is require'],
        },
        status: {
            type: Number,
            enum: [0, 1], // 0: chưa xem, 1: đã xem
            default: 0,
        },
        description: {
            type: String,
            required: [true, 'Description is require'],
        },
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('Notify', notificationSchema, 'notifies')
