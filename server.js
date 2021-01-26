require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const { google } = require('googleapis')

app.use(express.json())
const header = {
    'Access-Control-Allow-Origin': '*',
}
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
        method: 'GET,HEAD,PUT,PATCH,DELETE,POST',
        allowedHeaders: 'Content-Type, Accept, Authorization',
        credentials: true,
    }),
)

// const scopes = 'https://www.googleapis.com/auth/analytics.readonly'

// const jwt = new google.auth.JWT(
//     'dino-489@authentication-294614.iam.gserviceaccount.com',
//     null,
//     '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCjVGQiJtQZxQP5\nAPPHJPUVdYDYHpoupQUP19HDaUyqCpmvxGvGjzGil+CDjl+dsBUuKyGrIlcnE2LJ\n1zCuz3mWq5zPIivYx4cwgxKveqjnHjH+y9f/XL3caXx3z22eP/7OsOTIAmEr7lhK\nYK31SoqakXUJlKhEd5DNK3l/JtrMtqZ3c3sKBGFejyWaR+L9hJhMaxGaqDp9q98f\nyXvkXVlEaTidvcfsvNLWCxOrFv+OZy07WdCOouZZ7QDjkSY9j6mhBxOxIWkt6JIx\nPZH4fGgtHpyIFBLejBIUPDWO3X9u6MBFlLOi8oD1+AKVzRbdvKKZCDWIxECD+024\nl1Gh64A9AgMBAAECggEADsfUuZQSxOcKMWVSqlNZePQSd6+dSFqKsLpZM0chain3\naoUEZwp1jwwR6nxFG67gDwOJBatGTWgsHBP4Eqz+Vd8StVpkTJ14ShcygH4OY78p\nyxZRzIkG0+sZgBL3dC2NnTeigvvw8abQh23Kw4eK/FEf6rQKd9e4joVzdnxJRK+f\nZE5SvgAhPwPT65gDpW3rr9oym+XD7XPWZEeCF2CPjp2KXca7jRXa7lD+ZAvPUuyh\nsNcm+ou9D43CjcUPRgg7U2VplPiqws8B8LNmZLKZGaMbVJ/GRXBCqkxm12byHoil\nfJJATTFJU4RVbaBK5x3EvByAa0rHurhjVlH2ggxyCQKBgQDP9KPjK7+CnAEf45VH\nuUq8pEwO7c1E2UYl3g4yCF/8x6X1y9+gukyVhVY13LJNN9x/PO2ezNzkeUFB+lGe\n43GI7LoXBsoXzr73sHiiUNLhRDEPntgyJblDCZrSgYoxc2ynKQmj3/2UWEzfHiec\ntQoR0JEhvk3tjARMrUyOfl23MwKBgQDJEGKv59BbyLTza2vvlQgIVUjpch5AfRfg\n/2Ip6fbPzoDiKSsD08dGlF/aiFrHWnaFbLtiFGTVy0cU3QGRiyOuNq1tEQKSVL50\nRZfk7bxfaa/0wlr8lqGqcsz8VDpb4vOYA6ysyJGSXg8IPa4NfwyhYXSwYiAAt/kF\njfAiA5IqzwKBgHxpN8Mo4SIagvG5Dg4i5HuHL5me2zddZYIyHvv/1q08JCWxGtDl\no/uwEauXpXRc/yWAJgjjNyPZBxmZ0Ermd34bYhl0jmM/5S/5+7Hf+MmcKl3WAjG+\nL9/TVzSpGywKie5XttS7pNGjIho5yCkQhj2yMaGmYKjFI61b4Hk/UIHRAoGAHFRU\ns1hEQUpsRIf0M1OaSCJMHahYntmBTdBt8l3myqzb+AG479cdEtLBFrdzovcaD/6c\nAFvDQWRc5ZGmMO2b32YQ1Xc6F4gdNaDAoB7nFcJ8ak4gJ8rJiIyYWU0808mMbPTH\nlajE6gyarZyTM4+dJffnSxroS3GggqnXFdPO+n0CgYB2CR82ZEtbnfyf3+DYdvSc\n3VUFONjM2xWn2fnXSW/HmlsveYqKKWapLmh28CgquDvpSAVF3daMCLOfy1iOjAIb\nBvi9y4fGWBIa3x+6gkslRk+9hG7WaH8hiUi9CpRJGh0PqH8vyDe4smjYqUkeaGeb\nS2OgWO2tUtMsC3aONB/Bcw==\n-----END PRIVATE KEY-----\n',
//     scopes,
// )
// const view_id = '2245262809'
// async function getData() {
//     const response = await jwt.authorize()
//     console.log('ads')
//     const result = await google.analytics('v3').data.ga.get({
//         auth: jwt,
//         ids: 'ga:' + view_id,
//         'start-date': '30daysAgo',
//         'end-date': 'today',
//         metrics: 'ga:pageviews',
//     })

//     console.dir(result)
// }
// getData()
app.use(cookieParser())
app.use(
    fileUpload({
        useTempFiles: true,
        createParentPath: true,
    }),
)

const PORT = process.env.PORT || 5000

// io.origin('*:*')
const server = app.listen(PORT, () => {
    console.log('Server is runing port ', PORT)
})

require('./socket')(server)
// app.options('*', cors())

app.use('/user', require('./apis/user.api'))
app.use('/api', require('./apis/upload.api'))
app.use('/api', require('./apis/color.api'))
app.use('/api', require('./apis/size.api'))
app.use('/api', require('./apis/type_product.api'))
app.use('/api', require('./apis/style.api'))
app.use('/api', require('./apis/product.api'))
app.use('/api', require('./apis/material.api'))
app.use('/api', require('./apis/category.api'))
app.use('/api', require('./apis/order.api'))
app.use('/api', require('./apis/comment.api'))
app.use('/api', require('./apis/payment.api'))
app.use('/api', require('./apis/promotion.api'))
app.use('/api', require('./apis/evalute.api'))
//connect database
require('./helper/init-mongoose')
// Routes
