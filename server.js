const path = require('path')
const express = require('express')

const app = express()

const port = process.env.PORT || 5000
const publicDirectoryPath = path.join(__dirname, './client/public/index.html')

app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})