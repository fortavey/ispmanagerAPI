const express = require('express')
const siteRouter = require('./routes/routes')
const cors = require("cors");
var bodyParser = require("body-parser");

const PORT = process.env.PORT || 8888


const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use('/api', siteRouter)

app.listen(PORT, () => {
    console.log(`Server run on port ${PORT}...`)
})
