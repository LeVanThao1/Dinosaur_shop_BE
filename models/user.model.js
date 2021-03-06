const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your name'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
        },
        role: {
            type: Number,
            default: 0,
        },
        gender: {
            type: Number,
            default: 0,
        },
        avatar: {
            type: String,
            default:
                'https://res.cloudinary.com/thaovan/image/upload/v1606099416/Dinosuar_shop/avatar/male.jpg',
        },
        facebookId: {
            type: String,
        },
        cart: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: [true, 'Please choose product'],
                },
                amount: {
                    type: Number,
                    required: [true, 'Please choose quality'],
                },
                sizeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Size',
                    required: [true, 'Please choose size'],
                },
            },
        ],
        nation: {
            type: String,
        },
        provincial: {
            type: String,
        },
        district: {
            type: String,
        },
        wards: {
            type: String,
        },
        address: {
            type: String,
        },
        phone: {
            type: String,
        },
        deletedAt: {
            type: Date,
        },
    },
    {
        timestamps: true,
    },
)

module.exports = mongoose.model('User', userSchema, 'users')
