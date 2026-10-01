const express = require('express')
const app = express()
const port = process.env.PORT || 3000
require('./db/mogoose')
app.use(express.json())
const userRouter = require('./routers/user')
app.use(userRouter)
app.listen(port, () => {
    console.log('server is running on port ' + port)
})